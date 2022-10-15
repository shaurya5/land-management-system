const { getTimeNow } = require("../helpers/helper");
const { Block } = require("./block");
const { Transaction } = require("./transaction");
const util = require("util");

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()]; // Primary Chain Of Blockchain
    this.pendingTransactions = [];
  }

  createGenesisBlock() {
    const time = getTimeNow(); // Returns Current Time
    const propertyID = "prop1"; // For Genesis BLock Only
    const transaction = new Transaction(time, "johar", null);
    return new Block(time, "0", [transaction], propertyID);
  }

  // When a new property is added to the blockchain -> (not sold yet)
  addNewBlock(propertyID, sellerID) {
    const time = getTimeNow();
    const prevHash = this.chain[this.chain.length - 1].hash;

    const transaction = new Transaction(time, sellerID, null);
    const newBlock = new Block(time, prevHash, [transaction], propertyID);
    this.chain.push(newBlock);
  }

  // When a user buys an existing property, we clone the last transaction of that property and update the buyerID
  addExisitingBlock(propertyID, buyerID) {
    const transactions = this.getTransactionHistory(propertyID);
    // console.log(transactions)
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

    transactions.push(currentTransaction);
    const newBlock = new Block(time, prevHash, transactions, propertyID); // Created Block which is to be added

    this.chain.push(newBlock); //  Block Added to Blockchain and becomes most recent block of the chain
  }

  // Gets all the transactions of a particular propertyID
  getTransactionHistory(propertyID) {
    var transactionList = [];
    this.chain.forEach((block) => {
      if (block.propertyID === propertyID) {
        // console.log(block.transaction)
        transactionList.push(block.transaction[block.transaction.length - 1]);
      }
    });
    // console.log(util.inspect(transactionList, false, null, true));
    return transactionList;
  }
}

const bc = new Blockchain();

bc.addNewBlock("prop2", "saksham");
bc.addNewBlock("prop3", "sheikh");
bc.addExisitingBlock("prop2", "shaurya");
bc.addExisitingBlock("prop2", "saksham");
console.log(bc.getTransactionHistory("prop2")); // return transaction history of given property
// console.log(util.inspect(bc, false, null, true));                       // returns the Blockchain
module.exports = {
  Blockchain,
};
