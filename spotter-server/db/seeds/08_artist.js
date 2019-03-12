// var faker = require('faker');

// const fakeArtist = () => ({
//   name: faker.name.lastName(),
// });

let data = `The Beatles
Madonna
Elton John
Elvis Presley
Mariah Carey
Stevie Wonder
Janet Jackson
Michael Jackson
Whitney Houston
Rihanna
The Rolling Stones
Paul McCartney
Bee Gees
Usher
Chicago
The Supremes
Prince
Daryl Hall & John Oates
Rod Stewart
Olivia Newton-John
Drake
Aretha Franklin
Marvin Gaye
Taylor Swift
Katy Perry
Phil Collins
Billy Joel
Diana Ross
The Four Seasons
The Temptations
Donna Summer
The Beach Boys
Lionel Richie
Bruno Mars
Neil Diamond
Carpenters
Maroon 5
Boyz II Men
The Jacksons
Connie Francis
Brenda Lee
Kenny Rogers
Barbra Streisand
Bryan Adams
Cher
George Michael
The Black Eyed Peas
P!nk
Bobby Vinton
John Mellencamp
Three Dog Night
Huey Lewis & The News
Gloria Estefan
Bon Jovi
Chubby Checker
Ray Charles
Foreigner
Chris Brown
Kool & The Gang
Gladys Knight & The Pips
Ricky Nelson
Duran Duran
Justin Timberlake
Commodores
Eagles
Lady Gaga
TLC
Paul Anka
Barry Manilow
Dionne Warwick
Heart
Nelly
The Everly Brothers
Bobby Darin
R. Kelly
James Brown
Paula Abdul
Eminem
Alicia Keys
Kelly Clarkson
Linda Ronstadt
Richard Marx
Starship
Destiny's Child
Kanye West
Jay-Z
The Miracles
Bob Seger
Fleetwood Mac
Neil Sedaka
Justin Bieber
Bruce Springsteen
The Pointer Sisters
John Denver
Four Tops
Tony Orlando & Dawn
50 Cent
The 5th Dimension`

const artistsArr = data.split('\n')
const artists = [];
for (let artist of artistsArr) {
  artists.push({
    name: artist
  })
}

exports.seed = function(knex, Promise) {
  // const fakeArtists = [];
  // for (let i = 0; i < 10; i++) {
  //   fakeArtists.push(fakeArtist());
  // }
  // Deletes ALL existing entries
  return Promise.all([
    // Reset user ids to start with 1 again
    knex.schema.raw('ALTER SEQUENCE artist_id_seq RESTART WITH 1'),
    knex('artist').del()
      .then(function () {
        // Inserts seed entries
        return knex('artist').insert(artists);
    })
  ])
};
