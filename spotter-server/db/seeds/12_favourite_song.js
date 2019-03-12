
const rand = (x) => {
  return Math.floor(Math.random() * x) + 1;
}

const entry = () => ({
  favourite_id: rand(300),
  song_id: rand(90)
});

exports.seed = function(knex, Promise) {
  const randNumbers = [];
  for (let i = 0; i < 300; i++) {
    randNumbers.push(entry());
  }
  // Deletes ALL existing entries
  return knex('favourite_song').del()
    .then(function () {
      // Inserts seed entries
      return knex('favourite_song').insert(randNumbers);
  })
};

