import { APIService} from './partials/APIservice';
import { Notify } from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
};

init();


const ClassApi = new APIService;

let lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  overlayOpacity: 0.6,
  captionPosition: 'outside',
  captionDelay: 250,
});

function init() {
const clearBtn = createClearBtn();
  refs.form.append(clearBtn);
  const clearBtnEl = document.querySelector('.clear');
  clearBtnEl.addEventListener('click', clearBtnHandler)
  refs.form.addEventListener('submit', submitHendler);
 }

async function submitHendler(event) {
  event.preventDefault();
  deleteadditionalImgBtn();
  refs.gallery.innerHTML = '';
  ClassApi.page = 1;
  const { searchQuery: input } = refs.form;
  ClassApi.searchPar = input.value;
  await ClassApi.fetchImgs()
    .then(data => {
      if (data.data.total === 0) {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        return
  }
        Notify.success(`Hooray! We found totalHits images.${data.data.totalHits}`)
        renderImg(data);
          const loadMoreBtn = createAdditionalImgBtn();
          refs.gallery.after(loadMoreBtn);
          const additionalImgBtnEl = document.querySelector('.load-more-btn');
      additionalImgBtnEl.addEventListener('click', additionalImgBtnHendler);
      makeScroll();
  });
}

function clearBtnHandler() {
  refs.gallery.innerHTML = '';
  refs.form.searchQuery.value = '';
deleteadditionalImgBtn()
}

function additionalImgBtnHendler() {
  ClassApi.page += 1;
  ClassApi.fetchImgs()
    .then(response => {
      if (response.data.hits < ClassApi.page * ClassApi.perPage) {
        Notify.failure("We're sorry, but you've reached the end of search results.");
        deleteadditionalImgBtn();
      }
      renderImg(response)
    })
}

function renderImg(obj) {
  const dataArray = obj.data.hits;
  const markup = dataArray
    .map(el => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = el;
      return `    
      <div class="photo-card">
  <a class="img-link" href="${largeImageURL}"> <img src="${webformatURL}" alt="${tags}" loading="lazy"/>  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>
`;
    })
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh()
  }

function createAdditionalImgBtn() {
  const additionalImgBtn = document.createElement('button');
  additionalImgBtn.setAttribute('class', 'load-more-btn');
  additionalImgBtn.textContent = "Load more"
  return additionalImgBtn
}

function createClearBtn() {
  const ClearBtn = document.createElement('button');
  ClearBtn.setAttribute('class', 'clear');
  ClearBtn.setAttribute('type', 'button');
  ClearBtn.textContent = "Clear"
  return ClearBtn
}

function deleteadditionalImgBtn() {
  const additionalImgBtnEl = document.querySelector('.load-more-btn');
  if (additionalImgBtnEl) {
    additionalImgBtnEl.remove();
  }
}

function makeScroll() {

const { height: cardHeight } = document
  .querySelector(".gallery")
    .firstElementChild.getBoundingClientRect();
  window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});
}


