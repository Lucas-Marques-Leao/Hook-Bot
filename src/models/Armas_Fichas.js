const {Model, DataTypes} = require('sequelize');

module.exports = class Armas_Ficha extends Model{
    static init(sequelize) {
        return super.init({

        }, { sequelize, modelName: 'Armas_Ficha'});

    }
}