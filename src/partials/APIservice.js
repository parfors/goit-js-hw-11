import axios from 'axios';

// async function fetchImgs(imgQuery) {
//   const key = '28146499-54125423a2ce22d24a80a5e64';
//   const imgType = 'photo';
//   const orientation = 'horizontal';
//   const safesearch = 'true';
//   const url = `https://pixabay.com/api/?key=${key}&q=${imgQuery}&image_type=${imgType}&orientation=${orientation}&safesearch=${safesearch}`;
//   const query = await axios.get(url);
//   return query;
//   // fetch(url).then(response => response.json());
// }
export { fetchImg, APIService };


class APIService {
  constructor() {
    this.searchParametr = ''
  }
  
  async fetchImgs() {
    console.log(this);
    const key = '28146499-54125423a2ce22d24a80a5e64';
  const imgType = 'photo';
  const orientation = 'horizontal';
  const safesearch = 'true';
  const url = `https://pixabay.com/api/?key=${key}&q=${this.searchParametr}&image_type=${imgType}&orientation=${orientation}&safesearch=${safesearch}`;
  const query = await axios.get(url);
  return query;
  }

  get searchPar() {
    return this.searchParametr
  }

  set searchPar(query) {
    this.searchParametr = query
  }
}