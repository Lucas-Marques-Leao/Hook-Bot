const Ficha = require('../models/Ficha');
const Armas = require('../models/Armas');
const Armas_Ficha = require('../models/Armas_Fichas');

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
                console.log('Conectou-se ao Banco de Dados')
                
                //Inicializar os Modelos:

                Ficha.init(sequelize);
                Armas.init(sequelize);
                Armas_Ficha.init(sequelize);

                //Associações:

                Ficha.belongsToMany(Armas, { through: 'Armas_Ficha'});
                Armas.belongsToMany(Ficha, { through: 'Armas_Ficha'});

                
                //Enfim, pôr os dados no Banco!
                Ficha.sync({ alter: true});
                Armas.sync({ alter: true});
                
                
            })
        .catch(err => console.log(err));
    }
}