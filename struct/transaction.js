class Transaction {
  constructor(timestamp, sellerID, buyerID) {
    this.buyerID = buyerID; // ID of Person Buying the Property
    this.sellerID = sellerID; // ID of Person Selling the Property
    // this.propertyID = propertyID
    this.timestamp = timestamp; // Time at which transaction initiated
  }

  getSellerID() {
    return this.sellerID;
  }

  getBuyerID() {
    return this.buyerID;
  }
}

module.exports = {
  Transaction,
};
