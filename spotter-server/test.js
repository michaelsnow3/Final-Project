var faker = require('faker');

const test = () => (
  faker.commerce.productName()
)

const testarr = []

for (let i = 0; i < 20; i++) {
  testarr.push(test())
}

console.log(testarr)