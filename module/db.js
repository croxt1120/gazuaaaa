var Sequelize = require('sequelize');

var sequelize = new Sequelize('c9', 'carran', '',
{
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    pool:
    {
        max: 5,
        min: 0,
        idle: 10000
    },
});

var AssetModel = sequelize.define('asset',
{
    'id': { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    'coin': { type: Sequelize.STRING, },
    'price': { type: Sequelize.DOUBLE, },
    'quantity': { type: Sequelize.DOUBLE, },
    'buyDate': { type: Sequelize.DATEONLY, field: 'buy_date' },
    'company': { type: Sequelize.STRING, },
    'goal': { type: Sequelize.DOUBLE, },
    'member': { type: Sequelize.INTEGER, },
    'desc': { type: Sequelize.STRING, },
    'api': { type: Sequelize.STRING },
    'currentKey': { type: Sequelize.STRING, field: 'current_key' }
},
{
    freezeTableName: true // Model tableName will be the same as the model name
});

AssetModel.sync({ force: false }).then(() =>
{

}, (reason) =>
{
    console.log('create table error (asset)');
});

module.exports = {
    Asset: AssetModel
};
