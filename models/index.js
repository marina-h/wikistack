var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});

var Page = db.define('page', {
  title: {
      type: Sequelize.STRING,
      // allowNull: false
  },
  urlTitle: {
      type: Sequelize.STRING,
      allowNull: false,
  },
  content: {
      type: Sequelize.TEXT,
      allowNull: false
  },
  status: {
      type: Sequelize.ENUM('open', 'closed')
  },
  date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
  },
  tags: {
      type: Sequelize.ARRAY(Sequelize.STRING)
  }
},
{
  getterMethods: {
    route: function() {
      return '/wiki/' + this.urlTitle;
    }
  },
  hooks: {
    beforeValidate: function(Page){
      if (Page.title){
         Page.urlTitle = Page.title.replace(/\s+/g, '_').replace(/\W/g, '');
      } else {
        Page.urlTitle = Math.random().toString(36).substring(2, 7);
      }
    }
  },
  classMethods:{
    findByTag: function(tags){
      return Page.findAll({
                where:{
                  tags: {
                    $overlap: tags.split(' ')
                  }
                }
              });
    }
  },
  instanceMethods: {
    findSimilar: function(tags){
      return Page.findAll({
        where:{
          tags: {
            $overlap: tags
          },
          title:{
            $ne: this.title
          }
        }
      });
    }
  }
});

var User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
    }
});

Page.belongsTo(User, { as: 'author' });

module.exports = {
  Page: Page,
  User: User,
  db: db
};
