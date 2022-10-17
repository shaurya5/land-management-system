const { getTimeNow, getRandomInt } = require("../helpers/helper");
const { Block } = require("./block");
const { Transaction } = require("./transaction");
const { DPOS } = require('../logic/dpos')
const util = require('util')

class Blockchain {
  constructor() {
    this.users = []
    this.chain = [this.createGenesisBlock()];
    this.pendingTransactions = [];
  }

  createGenesisBlock() {
    const time = getTimeNow();
    const propertyID = "prop1"; // for genesis block only
    const sellerID = "123"
    const transaction = new Transaction(time, sellerID, null);
    this.users.push({
      id: sellerID,
      val: 50
    })
    return new Block(time, "0", [transaction], propertyID);
  }

  getDelegatesList() {
    return DPOS(this.users)
  }

  // When a new property is added to the blockchain -> (not sold yet)
  addNewBlock(propertyID, sellerID) {
    const time = getTimeNow();
    const prevHash = this.chain[this.chain.length - 1].hash;

    const unverifiedTransaction = new Transaction(time, sellerID, null);
    const verifiedTransaction = this.mine(unverifiedTransaction)
    const newBlock = new Block(time, prevHash, [verifiedTransaction], propertyID);
    this.chain.push(newBlock);
    this.users.push({
      id: sellerID,
      val: getRandomInt(0,100)
    })
    console.log("Block added!")
  }

  // When a user buys an existing property, we clone the last transaction of that property and update the buyerID
  addExisitingBlock(propertyID, buyerID, verifyID) {
    const delegates = this.getDelegatesList()
    if(!delegates.includes(verifyID)) {
      console.log("Unauthorized!");
      return;
    }
    const transactions = this.getTransactionHistory(propertyID);
    let lastTransactionSellerID =
      transactions[transactions.length - 1].buyerID === null
        ? transactions[transactions.length - 1].sellerID
        : transactions[transactions.length - 1].buyerID;
    const time = getTimeNow();
    const prevHash = this.chain[this.chain.length - 1].hash;

    const currentTransaction = new Transaction(
      time,
      lastTransactionSellerID,
      buyerID
    );
    
    const verifiedTransaction = this.mine(currentTransaction)
    transactions.push(verifiedTransaction);
    const newBlock = new Block(time, prevHash, transactions, propertyID); // Created Block which is to be added

    this.chain.push(newBlock);
    console.log("Block added!")
  }

  // Gets all the transactions of a particular propertyID
  getTransactionHistory(propertyID) {
    var transactionList = [];
    this.chain.forEach((block) => {
      if (block.propertyID === propertyID) {
        transactionList.push(block.transaction[block.transaction.length - 1]);
      }
    });
    return transactionList;
  }

  mine(unverifiedTransaction) {
    const verifiedTransaction = unverifiedTransaction
    return verifiedTransaction
  }
}

const bc = new Blockchain();

bc.addNewBlock("prop2", "1234");
bc.addNewBlock("prop3", "12345");
bc.addExisitingBlock("prop2", "123456", "123");
bc.addExisitingBlock("prop2", "1234", "12345");
// console.log(bc.getTransactionHistory("prop2"));
console.log(util.inspect(bc, false, null, true));

module.exports = {
  Blockchain,
};
