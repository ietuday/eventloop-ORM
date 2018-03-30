//Including dependency
var Sequelize = require('sequelize');
 
//Setting up the config
var sequelize = new Sequelize('playground', 'root', 'root', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

//Checking connection status
//You can use the .authenticate() function like this to test the connection.
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  // Models are defined with sequelize.define('name', {attributes}, {options}).

  const User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  }
});

// force: true will drop the table if it already exists
User.sync({force: true}).then(() => {
  // Table created
  return User.create({
    firstName: 'John',
    lastName: 'Hancock'
  });
});


//Find Query

User.findAll().then(users => {
  console.log(users)
})

User.findOne().then(user => {
  console.log(user.get('firstName'));
});

