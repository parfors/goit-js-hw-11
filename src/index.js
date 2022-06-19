import { fetchImg } from './partials/fechImg';

const refs = {
  form: document.querySelector('#search-form'),
};

refs.form.addEventListener('submit', submitHendler);

function submitHendler(event) {
  event.preventDefault();
  const { searchQuery: input } = refs.form;
  const searchQuery = input.value;
  fetchImg(searchQuery.trim()).then(resp => console.log(resp));
}
