const data = `Beyoncé	-	Drunk In Love
The Weeknd	-	The Hills
Robin Thicke	-	Blurred Lines
Eminem	-	The Monster
Macklemore and Ryan Lewis	-	Thrift Shop
Daft Punk	-	Get Lucky
Beyoncé	-	Partition
Frank Ocean	-	Thinkin Bout You
Nicki Minaj	-	Feeling Myself
Nicki Minaj	-	Only
Pharrell Williams	-	Happy
Beyoncé	-	Mine
Lorde	-	Royals
Justin Bieber	-	As Long As You Love Me
Justin Timberlake	-	Mirrors
Daft Punk	-	Instant Crush
The Weeknd	-	Often
Stromae	-	Papaoutai
Hozier	-	Take Me to Church ✓
John Legend	-	All of Me
Beyoncé	-	***Flawless (Remix)
Lana Del Rey	-	Young and Beautiful
Nicki Minaj	-	Anaconda
Maroon 5	-	One More Night
Rihanna	-	FourFiveSeconds
Mr. Probz	-	Waves ✓
Clean Bandit	-	Rather Be
Justin Timberlake	-	Suit & Tie
Beyoncé	-	***Flawless
Lady Gaga	-	Do What U Want
Romeo Santos	-	Odio
Jaden Smith	-	Best Tweets
Eminem	-	Stronger Than I Was
Iggy Azalea	-	Fancy
Brandon Beal	-	Twerk It Like Miley
Beyoncé	-	Blow
Usher	-	Climax
The Weeknd	-	Earned It
Miley Cyrus	-	Wrecking Ball
Taylor Swift	-	Bad Blood (Remix)
Beyoncé	-	Rocket
Rihanna	-	Stay
Katy Perry	-	Dark Horse
Beyoncé	-	7/11
Lady Gaga	-	Sexxx Dreams
Taylor Swift	-	Style
Natalie La Rose	-	Somebody
Jessie J	-	Bang Bang
Alessia Cara	-	Here✓
Rihanna	-	Bitch Better Have My Money
Lorde	-	Team
Major Lazer	-	Lean On
Eminem	-	Not Afraid
A Great Big World	-	Say Something
FKA twigs	-	Two Weeks
Taylor Swift	-	Blank Space
Britney Spears	-	Work Bitch
Justin Bieber - What Do You Mean?
Frank Ocean	-	Sweet Life
Nico & Vinz	-	Am I Wrong
Rihanna	-	Diamonds Remix
Justin Bieber	-	Confident
Beyoncé	-	Pretty Hurts
Rihanna	-	Loveeeeee Song
Justin Timberlake	-	Pusher Love Girl
Beyoncé	-	XO
Beyoncé	-	Bow Down / I Been On
One Direction	-	Drag Me Down
Beyoncé	-	Jealous
Ed Sheeran	-	Thinking Out Loud
Jess Glynne	-	Hold My Hand
Nicki Minaj	-	Favorite
Nicki Minaj	-	All Things Go
Beyoncé	-	Haunted ✓
Nicki Minaj	-	Buy A Heart
Eminem	-	Love the Way You Lie
Lady Gaga	-	G.U.Y. (Girl Under You)
Sia	-	Chandelier
Ariana Grande	-	The Way
Stromae	-	Carmen
The Weeknd	-	Tell Your Friends
​twenty one pilots	-	Tear In My Heart
Jay Z	-	Run This Town
Maroon 5	-	Payphone
Stromae	-	Formidable
Calvin Harris	-	How Deep Is Your Love
Suzanne Collins	-	The Hanging Tree
Justin Bieber	-	Beauty and a Beat
Sia	-	Elastic Heart
Mariah Carey	-	#Beautiful
Beyoncé	-	Heaven`

const data1 = data.split('\n')
const songsArr = []
for (let i of data1) {
  let x = i.split('') 
  let y = [];
  for (let j = 0; j < x.length; j++) {
    if (j > x.indexOf('-') && (x[j] !== '\t') && (x[j] !== '✓')){
      y.push(x[j])
    }    
  }
  songsArr.push(y.join(''))
}
const songs = [];
for (let i = 0; i < 50; i++) {
  songs.push({
    name: songsArr[i]
  })
}


exports.seed = function(knex, Promise) {
  
  // const fakeEntries = [];
  // for (let i = 0; i < 50; i++) {
  //   fakeEntries.push(fakeEntry());
  // }
  // Deletes ALL existing entries
  return Promise.all([
    // Reset user ids to start with 1 again
    knex.schema.raw('ALTER SEQUENCE song_id_seq RESTART WITH 1'),
    knex('song').del()
    .then(function () {
      // Inserts seed entries
      return knex('song').insert(songs);
    })
  ])
};
