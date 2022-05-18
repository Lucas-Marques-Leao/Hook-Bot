const { Model, DataTypes } = require('sequelize');

module.exports = class Armas extends Model{
    static init(sequelize) {
        return super.init({

            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                
            },
            
            nome_arma: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            
            bonus_magico: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 0,
            },

            dano: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            propriedades: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: true,
                
            },

            foto: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            
   
        }, { sequelize, modelName: 'Armas'});
        
    }


    getNomeArma() {
        if (this.bonus_magico && this.bonus_magico > 0) {
            return `${this.nome_arma} +${this.bonus_magico}`;
        }else{
            return this.nome_arma;
        }
    }

    setNomeArma(wenam) {
        this.nome_arma = wenam;
    }

    getBonusMagico() {
        return this.bonus_magico;
    }

    setBonusMagico(boma) {
        this.bonus_magico = boma;
    }

    getPropriedades() {
        return this.propriedades;
    }

    setPropriedades(prop) {
        this.propriedades.push(prop);
    }

    getFoto() {
        return this.foto;
    }

    setFoto(pic) {
        this.foto = pic;
    }

}