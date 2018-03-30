// advantages of ORM over traditional query approach

// Developers can only focus on business logic rather than writing interfaces
// between code and db. Reduces development time and costs by avoiding
// redundant codes Capable of connecting to different databases, which comes
// handy during switching from one db to the other. Helps to effectively query
// from multiple tables similar to SQL JOIN—ORM takes the responsibility of
// converting the object-oriented query approach to SQL queries.



// Getter and setter methods 
	// In Sequelize, we can define pseudo properties on
// a model. These properties are not an actual part of the database schema,
// they are just for the models. In the example above, "address" is a pseudo-
// property, and its value is initialized through getter and setter methods.
// When state and country are fetched from db, Sequelize merges them with a
// comma to populate the "address" property (getterMethods). Similarly, when
// we set the address, it gets split into state and country (setterMethods).
// Thus, the "address" seems like a column in db but actually it's not.

var sequelize = new Sequelize('mysql://username:password@localhost:5432/db_name');

var User = sequelize.define('user', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: 'compositeIndex'
  },
  lastName: {
    type: DataTypes.STRING,
    unique: 'compositeIndex'
  },
  age: {
  	type: DataTypes.NUMBER
  }
  dateJoined: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  getterMethods   : {
    address: function()  { return this.state + ', ' + this.country }
  },
  setterMethods   : {
    address: function(value) {
      var names = value.split(', ');
      this.setDataValue('country', names[0]);
      this.setDataValue('state', names[1]);
    },
  }
});
