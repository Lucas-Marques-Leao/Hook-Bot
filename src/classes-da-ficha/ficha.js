
const charSheet  =  class Ficha {
    constructor(nom, raç, cla){
        this.nome = nom
        this.raça = raç
        this.classePri = cla
        this.nivelPri = 1
        this.nivel = 1
        this.classeSec = "Nenhuma"
        this.nivelSec = 0
        this.idade = "12 anos"
        this.setAtributos(10, 10, 10, 10, 10, 10)
        this.inventario = []
        this.saude = 10
        this.saudeTemp = 0
        this.nivelConj = 0

        this.proficiencia()
    }

    getNome(){
        return this.nome
    }

    setNome(nom){
        this.nome = nom
    }

    getRaça(){
        return this.raça
    }

    setRaça(raç){
        this.raça = raç
    }   

    getClassePri(){
        return this.classePri
    }

    setClassePri(class1){
        this.classePri = class1
    }

    getClasseSec(){
        return this.classeSec
    }

    setClasseSec(class2){
        this.classeSec = class2
    }

    getNivelPri(){
        return this.nivelPri
    }

    setNivelPri(nPri){
        this.nivelPri = nPri
        this.nivel = this.nivelPri + this.nivelSec
        this.proficiencia()
    }

    getNivelSec(){
        return this.nivelSec
    }

    setNivelSec(nSec){
        this.nivelSec = nSec
        this.nivel = this.nivelPri + this.nivelSec
        this.proficiencia()
    }

    getNivel(){
        return this.nivel
    }

    getNivelConj(){
        return this.nivelConj
    }

    setNivelConj(magic){
        this.nivelConj = magic
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

    setAtributos(strength, dexterity, constitution, intelligence, wisdom, charisma){
        this.strAt = strength
        this.dexAt = dexterity
        this.conAt = constitution
        this.intAt = intelligence
        this.wisAt = wisdom
        this.chaAt = charisma
        this.atribuirmodificador()
    }

    getStrAt(){
        return this.strAt
    }

    setStrAt(strength){
        this.strAt = strength
        this.atribuirmodificador()
    }

    getDexAt(){
        return this.dexAt
    }

    setDexAt(dexterity){
        this.dexAt = dexterity
        this.atribuirmodificador()
    }

    getConAt(){
        return this.conAt
    }

    setConAt(constitution){
        this.conAt = constitution
        this.atribuirmodificador()
    }

    getIntAt(){
        return this.intAt
    }

    setIntAt(intelligence){
        this.intAt = intelligence
        this.atribuirmodificador()
    }

    getWisAt(){
        return this.wisAt
    }

    setWisAt(wisdom){
        this.wisAt = wisdom
        this.atribuirmodificador()
    }

    getChaAt(){
        return this.chaAt
    }

    setChaAt(charisma){
        this.chaAt = charisma
        this.atribuirmodificador()
    }

    getSaude(){
        return this.saude
    }

    setSaude(hp){
        this.saude = hp
    }

    getSaudeTemp(){
        return this.saudeTemp
    }

    setSaudeTemp(hpt){
        this.saudeTemp = hpt
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
        
         this.strMod = modifier[(this.strAt - 1)]
         this.dexMod = modifier[(this.dexAt - 1)]
         this.conMod = modifier[(this.conAt - 1)]
         this.intMod = modifier[(this.intAt - 1)]
         this.wisMod = modifier[(this.wisAt - 1)]
         this.chaMod = modifier[(this.chaAt - 1)]
    }   

    proficiencia(){
        let profic = ['+2', '+2', '+2', '+2', '+3', '+3', '+3', '+3', '+4', '+4', '+4', '+4', '+5', '+5', '+5', '+5', '+6', '+6', '+6', '+6', '+7', '+7', '+7', '+7', '+8', '+8', '+8', '+8', '+9', '+9']

        this.prof = profic[(this.nivel - 1)]
    }
    //Loucuras de Conjuração para Multiclasses com Magia(apenas até 2 classes diferentes)
    setConjClass1PactMagic(){
        this.nivelConj = "Magia de Pacto"
    }
    
    setConjClass1Full(){
        this.nivelConj = this.nivelPri

    }

    setConjClass1Half(){
        this.nivelConj = parseInt(this.nivelPri * 1 / 2)

    }
    
    setConjClass1Third(){
        this.nivelConj = parseInt(this.nivelPri * 1 / 3)

    }

    setConjClass2Full(){
        this.nivelConj = this.nivelSec
    }

    setConjClass2Half(){
        this.nivelConj = parseInt(this.nivelSec * 1 / 2)
    }

    setConjClass2Third(){
        this.nivelConj = parseInt(this.nivelSec * 1 / 3)
    }

    setConjClass1FullClass2Full(){
        this.nivelConj = (this.nivelPri  + this.nivelSec)
    }

    setConjClass1FullClass2Half(){
        this.nivelConj = parseInt(this.nivelPri + (this.nivelSec * 1 / 2))
    }

    setConjClass1FullClass2Third(){
        this.nivelConj = parseInt(this.nivelPri + (this.nivelSec * 1 / 3))
    }

    setConjClass1HalfClass2Full(){
        this.nivelConj = parseInt((this.nivelPri * 1 / 2) + this.nivelSec)
    }

    setConjClass1HalfClass2Half(){
        this.nivelConj = parseInt((this.nivelPri * 1 / 2) + (this.nivelSec * 1 / 2))
    }

    setConjClass1HalfClass2Third(){
        this.nivelConj = parseInt((this.nivelPri * 1 / 2) + (this.nivelSec *1 / 3))
    }

    setConjClass1ThirdClass2Full(){
        this.nivelConj = parseInt((this.nivelPri * 1 / 3) + this.nivelSec)
    }

    setConjClass1ThirdClass2Half(){
        this.nivelConj = parseInt((this.nivelPri * 1 / 3) + (this.nivelSec * 1 / 2))
    }

    setConjClass1ThirdClass2Third(){
        this.nivelConj = parseInt((this.nivelPri * 1 / 3) + (this.nivelSec * 1 / 3))
    }

    pornaTelaATabela(){
        this.informacoes = 
        `
         Nome: ${this.getNome()} 
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


module.exports = {charSheet}


let klaus = new charSheet("Klaus", "Tielfing", "Bruxo")
let rayer = new charSheet("Rayer", "Humano", "Clérigo")


klaus.setAtributos(10, 10, 10, 10, 10, 10)
klaus.setSaude(600)
klaus.setNivelPri(18)
klaus.setConjClass1PactMagic()
klaus.setInventario("Grimório Draemora")
klaus.setInventario("Lâmina Espectral")

rayer.setAtributos(9, 12, 8, 16, 22, 18)
rayer.setSaude(90)
rayer.setNivelPri(10)
rayer.setInventario("Escudo de Madeira")
rayer.setInventario("Símbolo Sagrado")
rayer.setConjClass1Full()

klaus.pornaTelaATabela()
rayer.pornaTelaATabela()


module.exports = {klaus}
module.exports = {rayer}
