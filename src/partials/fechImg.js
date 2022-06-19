function fetchImg(imgQuery) {
  const key = '28146499-54125423a2ce22d24a80a5e64';
  const imgType = 'photo';
  const orientation = 'horizontal';
  const safesearch = 'true';
  const url = `https://pixabay.com/api/?key=${key}&q=${imgQuery}&image_type=${imgType}&orientation=${orientation}&safesearch=${safesearch}`;
  return fetch(url).then(response => response.json());
}

export { fetchImg };
