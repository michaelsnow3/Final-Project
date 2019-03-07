module.exports = function queries(knex) {
  return {

    editProfile: function(userId) { 
      let user = await knex('users').select('name', 'id').where({id: userId});
        return user[0]
        
      knex('users')
        .insert({
          name: req.body.name,
          avatar: req.body.avatar,
          email: req.body.email
        })
        .then(() => {
        })
        .catch((err) => {
          console.log(err);
        });
      }

  }
}