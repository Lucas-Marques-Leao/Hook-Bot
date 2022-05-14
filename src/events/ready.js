const Ficha = require('../models/Ficha');
const Armas = require('../models/Armas');
require('dotenv').config();
const Sequelize = require('sequelize');


module.exports = {
    name: 'ready',
    once: true,
    async execute(){
        console.log(`O Bot tá pronto!`);
        const sequelize = new Sequelize( process.env.PGDatabase, process.env.PGUser , process.env.PGPassword, {
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            define: {
                timestamps: true,
                underscored: true,
            },
        });
        
        sequelize.authenticate()
            .then(() => {
                console.log('Conectou-se à Database')
                Ficha.init(sequelize);
                Armas.init(sequelize);

                Ficha.sync();
                Armas.sync();
            })
        .catch(err => console.log(err));
    }
}