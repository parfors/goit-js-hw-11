import { APIService, fetchImg } from './partials/APIservice';
import axios from 'axios';
import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
};

const ClassApi = new APIService;

refs.form.addEventListener('submit', submitHendler);


async function submitHendler(event) {
  event.preventDefault();
  const { searchQuery: input } = refs.form;
  ClassApi.searchPar = input.value;
  await ClassApi.fetchImgs().then(data => renderImg(data));
      const loadMoreBtn = createAdditionalImgBtn();
      refs.gallery.after(loadMoreBtn);
      const additionalImgBtnEl = document.querySelector('.load-more-btn');
      additionalImgBtnEl.addEventListener('click', additionalImgBtnHendler);
}

function additionalImgBtnHendler() {
  ClassApi.fetchImgs().then(data => renderImg(data));
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
      return `<div class="photo-card">
  <img src="${webformatURL}" alt="" loading="lazy" />
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
</div>`;
    })
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup)
}

function createAdditionalImgBtn() {
  const additionalImgBtn = document.createElement('button');
  additionalImgBtn.setAttribute('class', 'load-more-btn');
  additionalImgBtn.textContent = "Load more"
  return additionalImgBtn
}
