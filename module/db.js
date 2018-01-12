var Sequelize = require('sequelize');

var sequelize = new Sequelize('d6ohq6badpqk4m', 'gichddwddsgsyf', 'ad347ae3f6585c9aebd6fe1fd6f2aa8e8d6892bf0663e82d4a1f8f3273e07306',
{
    host: 'ec2-50-19-126-219.compute-1.amazonaws.com',
    port : 5432,
    protocol: 'postgres',
    dialect: 'postgres',
    operatorsAliases: false,
    pool:
    {
        max: 20,
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
    console.log(reason);
    console.log('create table error (asset)');
});

module.exports = {
    Asset: AssetModel
};
