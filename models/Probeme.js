const Sequelize = require("sequelize")


module.exports = sequelize.define("Probleme",{
    id: {
        type:Sequelize.INTEGER(11),
        allowNull: false ,
        autoIncrement : true ,
        primaryKey : true ,
    },
    content : Sequelize.STRING('500'),
    objet : Sequelize.STRING("100"),
    files: Sequelize.ARRAY(Sequelize.STRING),
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    state : Sequelize.ENUM(['recu','en cours','resolu'])

})