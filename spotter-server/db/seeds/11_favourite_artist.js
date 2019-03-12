
const rand = (x) => {
  return Math.floor(Math.random() * x) + 1;
}

const entry = () => ({
  favourite_id: rand(150),
  artist_id: rand(50)
});

exports.seed = function(knex, Promise) {
  const randNumbers = [];
  for (let i = 0; i < 100; i++) {
    randNumbers.push(entry());
  }
  // Deletes ALL existing entries
  return knex('favourite_artist').del()
    .then(function () {
      // Inserts seed entries
      return knex('favourite_artist').insert(randNumbers);
  })
};

