const SHA256 = require("crypto-js/sha256"); // library used to get Hash Values from input values provided
const { getTimeNow } = require("../helpers/helper"); //  Imported from helper.js file , used to return current time when a block is added

class Block {
  constructor(timestamp, previousHash, transaction, propertyID) {
    this.timestamp = timestamp; // string
    this.previousHash = previousHash; // Hash Of Most Recent Block Of Current Blockchain
    this.transaction = transaction; // List Of Transactions corresponding to that property-id
    this.propertyID = propertyID; // ID Of Property which is added in the blockchain
    this.hash = this.calculateHash();
    this.merkleRoot = this.calculateMerkleRoot();
  }

  calculateHash() {
    const data =
      this.timestamp +
      this.propertyID +
      JSON.stringify(this.transaction) + // Calculating Hash of current block which is to be added
      this.previousHash;
    return SHA256(data).toString();
  }

  calculateMerkleRoot() {
    // Calculating Merkle Root for List Of Transactions Belonging to Current Block
    var root = [];
    for (const t in this.transaction) {
      root.unshift(SHA256(JSON.stringify(t)));
    }
    while (root[0].length > 1) {
      let temp = [];

      for (let index = 0; index < root[0].length; index += 2) {
        if (index < root[0].length - 1 && index % 2 == 0)
          temp.push(
            // Implementation of Merkle Tree
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
