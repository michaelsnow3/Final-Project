// var faker = require('faker');

const genresArr = ['Pop', 'Rock', 'Latin', 'R&B', 'Blues', 'Classical', 'Country', 
  'Electronic', 'Folk', 'Jazz'
]

const genres = [];
for (let genre of genresArr) {
  genres.push({
    name: genre
  })
}
// const rand = (x) => {
//   return Math.floor(Math.random() * x) + 1;
// }
// const fakeGenre = (x) => ({
//   name: genres[rand(x)],
// });

exports.seed = function(knex, Promise) {

  // const fakeGenres = [];
  // for (let i = 0; i < 11; i++) {
  //   fakeGenres.push(fakeGenre());
  // }
  // Deletes ALL existing entries
  return Promise.all([
    // Reset user ids to start with 1 again
    knex.schema.raw('ALTER SEQUENCE genre_id_seq RESTART WITH 1'),
    knex('genre').del()
      .then(function () {
        // Inserts seed entries
        return knex('genre').insert(genres);
    })
  ])
};
