const { getTimeNow } = require("../helpers/helper")
const { Block } = require("./block")
const { Transaction } = require("./transaction")
const util = require('util')

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()]
    this.pendingTransactions = []
  }

  createGenesisBlock() {
    const time = getTimeNow()
    const propertyID = "prop1" // for genesis block only
    const transaction = new Transaction(propertyID, time, "johar")
    return new Block(time, "0", transaction, propertyID)
  }

  addBlock() {

  }

  // replace propertyid here with inputid
  getTransactionHistory(inputId) {
    var history = [];
    for(const block of this.chain){
      if(block.propertyID==inputId){
        console.log(block.JSON.stringify(Transaction));
        history.push(Transaction);
      }
    }
  }
}

const b = new Blockchain()
console.log(util.inspect(b,false,null,true))

module.exports = {
  Blockchain
}