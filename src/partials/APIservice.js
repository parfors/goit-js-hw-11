import axios from 'axios';
export { APIService };


class APIService {
  constructor() {
    this.searchParametr = '',
    this.key = '28146499-54125423a2ce22d24a80a5e64',
    this.imgType = 'photo',
    this.orientation = 'horizontal',
    this.safesearch = 'true',
    this.page = 1,
    this.perPage = 3
  }
  
  async fetchImgs() {
  const url = `https://pixabay.com/api/?key=${this.key}&q=${this.searchParametr}&image_type=${this.imgType}&orientation=${this.orientation}&safesearch=${this.safesearch}&per_page=${this.perPage}&page=${this.page}`;
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