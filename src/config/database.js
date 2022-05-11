const Sequelize = require('sequelize');
require('dotenv').config();

module.exports =  new Sequelize( process.env.PGDatabase, process.env.PGUser , process.env.PGPassword, {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    define: {
        timestamps: true,
        underscored: true,

    },
});