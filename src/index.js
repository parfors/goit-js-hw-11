import { fetchImg } from './partials/fechImg';
import axios from 'axios';
import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
};

refs.form.addEventListener('submit', submitHendler);

function submitHendler(event) {
  event.preventDefault();
  const { searchQuery: input } = refs.form;
  const searchQuery = input.value;
  fetchImg(searchQuery.trim()).then(data => renderImg(data));
}

function renderImg(obj) {
  const dataArray = obj.data.hits;
  console.log(dataArray);
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
  refs.gallery.innerHTML = markup;
}

// function renderImage() {}
