const { Model, DataTypes } = require('sequelize');

module.exports = class Ficha extends Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            author_id: { 
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true,
            },

            nome_ficha: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            raça: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            idade: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            foto: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            classe_pri: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            nivel_pri: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            classe_sec: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            nivel_sec: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            str_at: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 10,
            },
            dex_at: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 10,
            },
            con_at: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 10,
            },
            int_at: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 10,
            },
            wis_at: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 10,
            },
            cha_at: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 10,
            },
            inventario: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: true,
                
            },
            saude: { 
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            saude_temp: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            nivel_conj: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            
        }, { sequelize, modelName: 'ficha'});
    }

    getNomeFicha(){
        return this.nome_ficha
    }

    setNome(nom){
        this.nome_ficha = nom
    }

    getRaça(){
        return this.raça
    }

    setRaça(raç){
        this.raça = raç
    }   

    getClassePri(){
        return this.classe_pri
    }

    setClassePri(class1){
        this.classe_pri = class1
    }

    getClasseSec(){
        return this.classe_sec
    }

    setClasseSec(class2){
        this.classe_sec = class2
    }

    getNivelPri(){
        return this.nivel_pri
    }

    setNivelPri(nPri){
        this.nivel_pri = nPri
        this.nivel = this.nivel_pri + this.nivel_sec
        this.proficiencia()
    }

    getNivelSec(){
        return this.nivel_sec
    }

    setNivelSec(nSec){
        this.nivel_sec = nSec
        this.nivel = this.nivel_pri + this.nivel_sec
        this.proficiencia()
    }

    getNivel(){
        return this.nivel
    }

    setNivel(){
        this.nivel = this.nivel_pri + this.nivel_sec
        this.proficiencia();
    }

    getNivelConj(){
        return this.nivel_conj
    }

    setNivelConj(magic){
        this.nivel_conj = magic
    }

    getInventario(){
        return this.inventario
    }

    setInventario(item){
        this.inventario.push(item)
    }

    getIdade(){
        return this.idade
    }

    setIdade(age){
        this.idade = age
    }

    getFoto() {
        return this.foto
    }

    setFoto(pic) {
        this.foto = pic
    }

    setAtributos(strength, dexterity, constitution, intelligence, wisdom, charisma){
        this.str_at = strength
        this.dex_at = dexterity
        this.con_at = constitution
        this.int_at = intelligence
        this.wis_at = wisdom
        this.cha_at = charisma
        this.atribuirmodificador()
    }

    getStrAt(){
        return this.str_at
    }

    setStrAt(strength){
        this.str_at = strength
        this.atribuirmodificador()
    }

    getDexAt(){
        return this.dex_at
    }

    setDexAt(dexterity){
        this.dex_at = dexterity
        this.atribuirmodificador()
    }

    getConAt(){
        return this.con_at
    }

    setConAt(constitution){
        this.con_at = constitution
        this.atribuirmodificador()
    }

    getIntAt(){
        return this.int_at
    }

    setIntAt(intelligence){
        this.int_at = intelligence
        this.atribuirmodificador()
    }

    getWisAt(){
        return this.wis_at
    }

    setWisAt(wisdom){
        this.wis_at = wisdom
        this.atribuirmodificador()
    }

    getChaAt(){
        return this.cha_at
    }

    setChaAt(charisma){
        this.cha_at = charisma
        this.atribuirmodificador()
    }

    getSaude(){
        return this.saude
    }

    setSaude(hp){
        this.saude = hp
    }

    getSaudeTemp(){
        return this.saude_temp
    }

    setSaudeTemp(hpt){
        this.saude_temp = hpt
    }

    getProf(){
        return this.prof
    }

    getStrMod(){
        return this.strMod
    }

    getDexMod(){
        return this.dexMod
    }

    getConMod(){
        return this.conMod
    }

    getIntMod(){
        return this.intMod
    }

    getWisMod(){
        return this.wisMod
    }

    getChaMod(){
        return this.chaMod
    }


    atribuirmodificador(){
        let modifier = ['-5', '-4', '-4', '-3' , '-3', '-2' , '-2', '-1','-1', '0' , '0', '+1', '+1', '+2', '+2', '+3', '+3', '+4', '+4','+5', '+5', '+6', '+6', '+7', '+7', '+8', '+8', '+9', '+9', '+10']
        
         this.strMod = modifier[(this.str_at - 1)]
         this.dexMod = modifier[(this.dex_at - 1)]
         this.conMod = modifier[(this.con_at - 1)]
         this.intMod = modifier[(this.int_at - 1)]
         this.wisMod = modifier[(this.wis_at - 1)]
         this.chaMod = modifier[(this.cha_at - 1)]
    }   

    proficiencia(){
        let profic = ['+2', '+2', '+2', '+2', '+3', '+3', '+3', '+3', '+4', '+4', '+4', '+4', '+5', '+5', '+5', '+5', '+6', '+6', '+6', '+6', '+7', '+7', '+7', '+7', '+8', '+8', '+8', '+8', '+9', '+9']

        this.prof = profic[(this.nivel - 1)]
    }
    //Loucuras de Conjuração para Multiclasses com Magia(apenas até 2 classes diferentes)
    setConjClass1PactMagic(){
        this.nivel_conj = "Magia de Pacto"
    }
    
    setConjClass1Full(){
        this.nivel_conj = this.nivel_pri

    }

    setConjClass1Half(){
        this.nivel_conj = parseInt(this.nivel_pri * 1 / 2)

    }
    
    setConjClass1Third(){
        this.nivel_conj = parseInt(this.nivel_pri * 1 / 3)

    }

    setConjClass2Full(){
        this.nivel_conj = this.nivel_sec
    }

    setConjClass2Half(){
        this.nivel_conj = parseInt(this.nivel_sec * 1 / 2)
    }

    setConjClass2Third(){
        this.nivel_conj = parseInt(this.nivel_sec * 1 / 3)
    }

    setConjClass1FullClass2Full(){
        this.nivel_conj = (this.nivel_pri  + this.nivel_sec)
    }

    setConjClass1FullClass2Half(){
        this.nivel_conj = parseInt(this.nivel_pri + (this.nivel_sec * 1 / 2))
    }

    setConjClass1FullClass2Third(){
        this.nivel_conj = parseInt(this.nivel_pri + (this.nivel_sec * 1 / 3))
    }

    setConjClass1HalfClass2Full(){
        this.nivel_conj = parseInt((this.nivel_pri * 1 / 2) + this.nivel_sec)
    }

    setConjClass1HalfClass2Half(){
        this.nivel_conj = parseInt((this.nivel_pri * 1 / 2) + (this.nivel_sec * 1 / 2))
    }

    setConjClass1HalfClass2Third(){
        this.nivel_conj = parseInt((this.nivel_pri * 1 / 2) + (this.nivel_sec *1 / 3))
    }

    setConjClass1ThirdClass2Full(){
        this.nivel_conj = parseInt((this.nivel_pri * 1 / 3) + this.nivel_sec)
    }

    setConjClass1ThirdClass2Half(){
        this.nivel_conj = parseInt((this.nivel_pri * 1 / 3) + (this.nivel_sec * 1 / 2))
    }

    setConjClass1ThirdClass2Third(){
        this.nivel_conj = parseInt((this.nivel_pri * 1 / 3) + (this.nivel_sec * 1 / 3))
    }

    pornaTelaATabela(){
        this.informacoes = 
        `
         Nome: ${this.getNomeFicha()} 
         Nível: ${this.getNivel()}
         Bônus de Proficiência: ${this.getProf()}
         Raça: ${this.getRaça()} 
         
         Idade: ${this.getIdade()} 
         
         Classe Primária: ${this.getClassePri()} 
         Nível Primário: ${this.getNivelPri()} 
         
         Classe Secundária: ${this.getClasseSec()} 
         Nível Secundário: ${this.getNivelSec()} 
         
         Nível de Conjurador: ${this.getNivelConj()}
         Pontos de Vida: ${this.getSaude()} 
         Pontos de Vida Temporários: ${this.getSaudeTemp()}
         
         Inventário: ${this.getInventario()}
          
         Atributos: 
                     Força: ${this.getStrAt()}
                     Destreza: ${this.getDexAt()}
                     Constituição: ${this.getConAt()}
                     Inteligência: ${this.getIntAt()}
                     Sabedoria: ${this.getWisAt()}
                     Carisma: ${this.getChaAt()} 
        
         Modificadores: 
                    Mod de Força: ${this.getStrMod()}
                    Mod de Destreza: ${this.getDexMod()}
                    Mod de Constituição: ${this.getConMod()}
                    Mod de Inteligência: ${this.getIntMod()}
                    Mod de Sabedoria: ${this.getWisMod()}
                    Mod de Carisma: ${this.getChaMod()}`
    }

}