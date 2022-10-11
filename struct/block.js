const SHA256 = require("crypto-js/sha256");
const { getTimeNow } = require("../helpers/helper");

class Block {
  constructor(timestamp, previousHash, transaction, propertyID) {
    this.propertyID = propertyID; // string
    
    this.previousHash = previousHash; // string
    this.hash = this.calculateHash();
    this.timestamp = timestamp; // string
    this.transaction = transaction; // array of Transaction objects
    this.merkleRoot = this.calculateMerkleRoot();
    this.version = this.transaction.length; // int
  }

  calculateHash() {
    const data =
      this.timestamp +
      this.propertyID +
      JSON.stringify(this.transaction) +
      this.previousHash;
    return SHA256(data).toString();
  }

  calculateMerkleRoot() {
    var root = [];
    for (const t in this.transaction) {
      root.unshift(SHA256(JSON.stringify(t)));
    }
    while (root[0].length > 1) {
      let temp = [];

      for (let index = 0; index < root[0].length; index += 2) {
        if (index < root[0].length - 1 && index % 2 == 0)
          temp.push(
            SHA256(JSON.stringify(root[0][index] + root[0][index + 1]))
          );
        else temp.push(root[0][index]);
      }
      root.unshift(temp);
    }
    return root[0].toString();
  }

  
}

module.exports = {
  Block,
};
