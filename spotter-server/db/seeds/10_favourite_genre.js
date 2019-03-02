
const rand = () => {
  return Math.floor(Math.random() * 10) + 1;
}

const entry = () => ({
  favourite_id: rand(),
  genre_id: rand()
});

exports.seed = function(knex, Promise) {
  const randNumbers = [];
  for (let i = 0; i < 10; i++) {
    randNumbers.push(entry());
  }
  // Deletes ALL existing entries
  return knex('favourite_genre').del()
    .then(function () {
      // Inserts seed entries
      return knex('favourite_genre').insert(randNumbers);
  })
};

