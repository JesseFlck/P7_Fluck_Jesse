const DataTypes = require('sequelize');

const Comment = ('Comment', {
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
    freezeTableName : true,
});

module.exports = Comment;