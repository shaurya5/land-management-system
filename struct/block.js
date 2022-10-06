const SHA256 = require('crypto-js/sha256')
const { getTimeNow } = require('../helpers/helper')

class Block {
  constructor(timestamp, previousHash, transaction, propertyID) {
    this.timestamp = timestamp // string
    this.previousHash = previousHash // string
    this.transaction = transaction // array of Transaction objects
    this.propertyID = propertyID // string
    this.hash = this.calculateHash()
  }

  calculateHash() {
    const data = this.timestamp + this.propertyID + JSON.stringify(this.transaction) + this.previousHash
    return SHA256(data).toString()
  }
}

module.exports = {
  Block
}