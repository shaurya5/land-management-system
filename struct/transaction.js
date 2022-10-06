class Transaction {
  constructor(timestamp, sellerID = null, buyerID = null) {
    this.buyerID = buyerID // string
    this.sellerID = sellerID // string
    // this.propertyID = propertyID // string
    this.timestamp = timestamp // string
  }

  getSellerID() {
    return this.sellerID
  }

  getBuyerID() {
    return this.buyerID
  }
}

module.exports = {
  Transaction
}