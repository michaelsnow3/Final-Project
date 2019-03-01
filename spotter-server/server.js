const search = require('./search/search-song.js');

search.getSongs('everybody wants to rule the world').then(data => {
  console.log(data[0].artists)
})