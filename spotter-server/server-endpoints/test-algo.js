const Algorithmia = require("algorithmia");
module.exports = function match (aaa) {
  return run(aaa)

}


  const result = []
  let i = 0; 
  const run = (aaa) => {
  if ( i === 5) {
    console.log(2222222222, result)
    return result;
  }
  else {
    Algorithmia.client("simmxo6hMreL3iS9k6Yu7G2k04B1")
    .algo("matching/DatingAlgorithm/0.1.3") // timeout is optional
    .pipe(aaa)
    .then(function(response) {
      const match = response.get()['User'] 
      console.log(response)
      result.push(match)
      // console.log(response.get())
      // console.log('match: ', match)
      // console.log('result: ', result);
      let xxx = aaa; 
      xxx.group2 = aaa.group2.filter(x => {
        return x.name !== match
      })
      // console.log(xxx)
      i++;
      return run(xxx)
    });
  }
}

// pass in primary users name
// function to fetch favs, top 10
// fill in user's favourites using func
// access all users from database
// fill in favs with func
// run matching



const input = {
    // "scoring_weights": {
    //   //songs
    //   "interests": 1.5,
    //   //artists
    //   "values": 7.5,
    //   //albums
    //   "age": 0.65,
    //   //genres
    //   "coordinates": 0.015
    // },
    
    //       { name: 'User',
    // interests: [ 'Licensed Rubber Chips', 'Fantastic Cotton Table' ],
    // values: [],
    // age: '0',
    // coordinates: { lat: 43.6532, long: 79.3832 } }
    
    "group1": [
    {
        "name": "User",
        "interests": [
            "reading",
            "running",
            "chilling",
            "coding",
            "seattle",
            "coffee",
            "tea",
            "bilingual",
            "food",
            "arrested development",
            "the office",
            "parc and rec",
            "rick and morty"
        ],
        "values": [
            "humanism"
        ],
        "age": "22",
        "coordinates": {
            "lat": 47.599088077746394,
            "long": -122.3339125374332
        }
    },
],



    "group2": 
    // [ { id: 1,
    //     name: 'Yu-Ning',
    //     interests: [],
    //     values: [],
    //     age: '0',
    //     coordinates: { lat: 43.6532, long: 79.3832 } },
    //   { id: 2,
    //     name: 'Michael',
    //     interests: [ 'Unbranded Rubber Soap' ],
    //     values: [ 'Ernser', 'Kemmer', 'Becker' ],
    //     age: '0',
    //     coordinates: { lat: 43.6532, long: 79.3832 } },
    //   { id: 3,
    //     name: 'Stan',
    //     interests: 
    //      [ 'Tasty Concrete Hat',
    //        'Ergonomic Wooden Chicken',
    //        'Practical Metal Sausages',
    //        'Practical Metal Sausages',
    //        'Practical Metal Sausages',
    //        'Fantastic Cotton Table' ],
    //     values: [ 'Schiller', 'Kemmer', 'Ernser', 'Becker' ],
    //     age: '0',
    //     coordinates: { lat: 43.6532, long: 79.3832 } },
    //   { id: 4,
    //     name: 'Bulah Kertzmann',
    //     interests: [],
    //     values: [ 'Kemmer' ],
    //     age: '0',
    //     coordinates: { lat: 43.6532, long: 79.3832 } },
    //   { id: 5,
    //     name: 'Dean Moen DVM',
    //     interests: [],
    //     values: [],
    //     age: '0',
    //     coordinates: { lat: 43.6532, long: 79.3832 } },
    //   { id: 6,
    //     name: 'Misty Cummings',
    //     interests: [],
    //     values: [],
    //     age: '0',
    //     coordinates: { lat: 43.6532, long: 79.3832 } },
    //   { id: 7,
    //     name: 'Brant Kshlerin',
    //     interests: [],
    //     values: [],
    //     age: '0',
    //     coordinates: { lat: 43.6532, long: 79.3832 } },
    //   { id: 8,
    //     name: 'Mr. Darien Carter',
    //     interests: [],
    //     values: [],
    //     age: '0',
    //     coordinates: { lat: 43.6532, long: 79.3832 } },
    //   { id: 9,
    //     name: 'Gabriella Beatty',
    //     interests: [ 'Fantastic Cotton Table' ],
    //     values: [ 'Prohaska' ],
    //     age: '0',
    //     coordinates: { lat: 43.6532, long: 79.3832 } },
    //   { id: 10,
    //     name: 'Abigayle Legros',
    //     interests: [],
    //     values: [ 'Schiller' ],
    //     age: '0',
    //     coordinates: { lat: 43.6532, long: 79.3832 } },
    //   { id: 11,
    //     name: 'Violette Grimes',
    //     interests: [],
    //     values: [],
    //     age: '0',
    //     coordinates: { lat: 43.6532, long: 79.3832 } },
    //   { id: 12,
    //     name: 'Eveline Gottlieb',
    //     interests: [],
    //     values: [],
    //     age: '0',
    //     coordinates: { lat: 43.6532, long: 79.3832 } },
    //   { id: 13,
    //     name: 'Fern Haley',
    //     interests: [],
    //     values: [],
    //     age: '0',
    //     coordinates: { lat: 43.6532, long: 79.3832 } } ]






    [
    {
        "name": "Julia the Jukebox",
        "interests": [
            "music",
            "rock",
            "coffee",
            "guitar hero"
        ],
        "values": [
            "individuality"
        ],
        "age": "22",
        "coordinates": {
            "lat": 47.62446091996251,
            "long": -122.32016064226627
        }
    },
    {
        "name": "Chelsea the Bookworm",
        "interests": [
            "reading",
            "writing",
            "classics",
            "coffee",
            "walking"
        ],
        "values": [
            "family",
            "love"
        ],
        "age": "26",
        "coordinates": {
            "lat": 47.62446091996251,
            "long": -122.32016064226627
    }
    },
    {
        "name": "Ana the Artist",
        "interests": [
            "drawing",
            "art",
            "music",
            "classical music",
            "tea",
            "running"
        ],
        "values": [
            "post-modernism",
            "beauty"
        ],
        "age": "32",
        "coordinates": {
            "lat": 47.62446091996251,
            "long": -122.32016064226627
    }
    },
    {
        "name": "Laea the Space Pirate",
        "interests": [
            "coffee",
            "pirating",
            "traveling",
            "netflix"
        ],
        "values": [
            "vegetarianism",
            "individuality"
        ],
        "age": "39",
        "coordinates": {
            "lat": 47.62446091996251,
            "long": -122.32016064226627
    }
    },
    {
        "name": "Jules the Hipster",
        "interests": [
            "Scruffy Beards",
            "coffee",
            "tumblr",
            "postmodern art"
        ],
        "values": [
            "individuality",
            "relationships"
        ],
        "age": "21",
        "coordinates": {
            "lat": 47.62446091996251,
            "long": -122.32016064226627
    }
    },
    {
        "name": "Hale the Chef",
        "interests": [
            "food",
            "cooking",
            "tea",
            "microbrewery",
            "turkish cuisine"
        ],
        "values": [
            "family",
            "love"
        ],
        "age": "29",
        "coordinates": {
            "lat": 47.62446091996251,
            "long": -122.32016064226627
    }
    },
    {
        "name": "Natalie the Lawyer",
        "interests": [
            "law",
            "bird law",
            "coffee",
            "running"
        ],
        "values": [
            "love",
            "individuality"
        ],
        "age": "33",
        "coordinates": {
            "lat": 47.62446091996251,
            "long": -122.32016064226627
    }
    },
    {
        "name": "Kate the Teacher",
        "interests": [
            "education",
            "kids",
            "iced tea",
            "apple pie",
            "science"
        ],
        "values": [
            "individuality",
            "scepticism"
        ],
        "age": "32",
        "coordinates": {
            "lat": 47.62446091996251,
            "long": -122.32016064226627
    }
    },
    {
        "name": "Maria the Engineer",
        "interests": [
            "science",
            "tech",
            "engineering",
            "hackathons",
            "coffee",
            "running"
        ],
        "values": [
            "individuality",
            "free speech",
            "activism"
        ],
        "age": "22",
        "coordinates": {
            "lat": 47.62446091996251,
            "long": -122.32016064226627
    }
    },
    {
        "name": "Hannah the Model",
        "interests": [
            "fashion",
            "paris",
            "france",
            "tea",
            "traveling"
        ],
        "values": [
            "love",
            "art"
        ],
        "age": "24",
        "coordinates": {
            "lat": 47.62446091996251,
            "long": -122.32016064226627
        }
    }
]
};

// const input2= {"group1":[{"name":"User","interests":["c","Licensed Rubber Chips","Fantastic Cotton Table"],"values":["d"],"age":"22","coordinates":{"lat":43.6532,"long":79.3832}}],"group2":[{"name":"Yu-Ning","interests":["a"],"values":["a"],"age":"22","coordinates":{"lat":43.6532,"long":79.3832},"id":1},{"name":"Michael","interests":["a","Unbranded Rubber Soap"],"values":["a","Ernser","Kemmer","Becker"],"age":"22","coordinates":{"lat":43.6532,"long":79.3832},"id":2},{"name":"Stan","interests":["a","Tasty Concrete Hat","Ergonomic Wooden Chicken","Practical Metal Sausages","Practical Metal Sausages","Practical Metal Sausages","Fantastic Cotton Table"],"values":["a","Schiller","Kemmer","Ernser","Becker"],"age":"22","coordinates":{"lat":43.6532,"long":79.3832},"id":3},{"name":"Bulah Kertzmann","interests":["a"],"values":["a","Kemmer"],"age":"22","coordinates":{"lat":43.6532,"long":79.3832},"id":4},{"name":"Dean Moen DVM","interests":["a"],"values":["a"],"age":"22","coordinates":{"lat":43.6532,"long":79.3832},"id":5},{"name":"Misty Cummings","interests":["a"],"values":["a"],"age":"22","coordinates":{"lat":43.6532,"long":79.3832},"id":6},{"name":"Brant Kshlerin","interests":["a"],"values":["a"],"age":"22","coordinates":{"lat":43.6532,"long":79.3832},"id":7},{"name":"Mr. Darien Carter","interests":["a"],"values":["a"],"age":"22","coordinates":{"lat":43.6532,"long":79.3832},"id":8},{"name":"Gabriella Beatty","interests":["a","Fantastic Cotton Table"],"values":["a","Prohaska"],"age":"22","coordinates":{"lat":43.6532,"long":79.3832},"id":9},{"name":"Abigayle Legros","interests":["a"],"values":["a","Schiller"],"age":"22","coordinates":{"lat":43.6532,"long":79.3832},"id":10},{"name":"Violette Grimes","interests":["a"],"values":["a"],"age":"22","coordinates":{"lat":43.6532,"long":79.3832},"id":11},{"name":"Eveline Gottlieb","interests":["a"],"values":["a"],"age":"22","coordinates":{"lat":43.6532,"long":79.3832},"id":12},{"name":"Fern Haley","interests":["a"],"values":["a"],"age":"22","coordinates":{"lat":43.6532,"long":79.3832},"id":13}]}
// const result = []
// let i = 0; 
// const run = (aaa) => {
//     if ( i === 5) {
//         console.log(result)
//         return result;
//     }
//     else {
//       Algorithmia.client("simmxo6hMreL3iS9k6Yu7G2k04B1")
//           .algo("matching/DatingAlgorithm/0.1.3") // timeout is optional
//           .pipe(aaa)
//           .then(function(response) {
//             const match = response.get()['User'] 
//             result.push(match)
//             console.log(response.get())
//             // console.log('match: ', match)
//             // console.log('result: ', result);
//             let xxx = aaa; 
//             xxx.group2 = aaa.group2.filter(x => {
//               return x.name !== match
//             })
//             // console.log(xxx)
//             i++;
//             return run(xxx)
//         });
//         }

// }

// run(input2)

// noSpace = (input) => {
//   input.group1[0].interests.map(x => {
//     x.split('').filter(item => item.trim() !== '').join('')
//   })
//   console.log(input.group1[0].interests)
// }

// noSpace(input)


// str = 'a aaa                c'
// array = str.split('').filter(item => item.trim() !== '').join('')

// console.log(array)        



// Algorithmia.client("simmxo6hMreL3iS9k6Yu7G2k04B1")
//           .algo("matching/DatingAlgorithm/0.1.3?timeout=300") // timeout is optional
//           .pipe(input)
//           .then(function(response) {
//             result = response.get()[1]
//               console.log(result);
//               const newGroup3 = input.group2.filter(x => {
//                 return x.name !== Object.values(result)
//               })
//               console.log(newGroup3)
//             })



// const matchResult = []
// let counter = 0; 


// const matching = (data) => {
//   if ( counter === 5) {
//       console.log(matchResult)
//       // return matchResult;
//   }
//   else {
//     Algorithmia.client("simmxo6hMreL3iS9k6Yu7G2k04B1")
//         .algo("matching/DatingAlgorithm/0.1.3")
//         .pipe(data)
//         .then(function(response) {
//           const match = response.get()['User'] 
//           matchResult.push(match)
//           console.log(response.get())
//           // console.log('match: ', match)
//           // console.log('matchResult: ', matchResult);
//           let newInput = data; 
//           newInput.group2 = data.group2.filter(entry => {
//             return entry.name !== match
//           })
//           // console.log(xxx)
//           counter++;
//           return matching(newInput)
//         });
//   }
// }