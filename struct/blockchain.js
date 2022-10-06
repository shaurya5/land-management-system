const { getTimeNow } = require("../helpers/helper");
const { Block } = require("./block");
const { Transaction } = require("./transaction");
const util = require('util');

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.pendingTransactions = [];
  }

  createGenesisBlock() {
    const time = getTimeNow();
    const propertyID = "prop1"; // for genesis block only
    const transaction = new Transaction(propertyID, time, "johar");
    return new Block(time, "0", transaction, propertyID);
  }

  // When a new property is added to the blockchain -> (not sold yet)
  addNewBlock(propertyID, sellerID) { 
    const time = getTimeNow();
    const prevHash = this.chain[this.chain.length - 1].hash;

    const transaction = new Transaction(time, sellerID, null);
    const newBlock = new Block(time, prevHash, transaction, propertyID);
    this.chain.push(newBlock);
  }
  
  // When a user buys an existing property, we clone the last transaction of that property and update the buyerID
  addExisitingBlock(propertyID, buyerID) {
    let lastTransactionSellerID = "" 
    this.chain.forEach((block) => {
      if(propertyID === block.propertyID && block.buyerID === null) {
        lastTransactionSellerID = block.transaction.sellerID
      }
    })

    const time = getTimeNow();
    const prevHash = this.chain[this.chain.length - 1].hash;
    const transaction = new Transaction(time, lastTransactionSellerID, buyerID)
    const newBlock = new Block(time, prevHash, transaction, propertyID);
    this.chain.push(newBlock)
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

const bc = new Blockchain()

bc.addNewBlock("prop2", "saksham")
bc.addNewBlock("prop3", "sheikh")
bc.addExisitingBlock("prop3", "shaurya")

console.log(util.inspect(bc, false, null, true));

module.exports = {
  Blockchain,
};
