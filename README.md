# land-management-system
Project Assignment for Blockchain course


# Team Members - (Group 24)
1. Saksham Bansal `2020A3PS2129H`
2. Samarth Sharma `2020A3PS0615H`
3. Shaurya Garg `2020A8PS2215H`
4. Akshat Johar `2020A3PS1793H`

# Objective
* This project consists of building a blockchain system for land management. 
* This project focuses on implementing Delegated Proof of Stake (DPoS) consensus algorithm


# Delegated Proof of Stake (DPoS) Algorithm
DPoS is a reliable, robust, scalable and efficient consensus algorithm in Blockchain technology. It is an innovation over standard Proof of Stake (PoS). In DPoS, each node that has a stake in the system can delegate the validation of a transaction to other nodes by voting.

Here, in DPoS ,user's vote weight is proportional to their stake rather than block mining being tied to the stakeholders' total tokens.


# How to Run
1. Make sure that you have Node.js installed on your machine
2. cd Project

# Various Classes used
## helpers 
Here we have defined some utility functions for perusal in our project at various places.
### helper.js 
* To get the timestamp of the current transacation we get the time using getTimeNow function , convert it to UTC time and then into miliseconds. 
* The formatted time we get is exported for use in blockchain.js, block.js

#  struct 

### block.js
* imported the SHA256 library to generate the hash function
* the following attributes have been given to a block : propertyID, previousHash,Hash, timestamp, transacation, merkele Root
* Function to calculate hash is defined which takes in the data as timestamp,propertyID, previoushash and merkle root of transactions
* Merkle Root function takes in the array of transactions. It then pairs up the transacation as needed in a binary tree and hashes them pair-wise. Finally the root hash is returned which is included in the block structure after being hashed with the current hash.


### blockchain.js
* Blockchain class is created with its constructor calling the createGenesisBlock function
* Inside Create Genesis Block we are passing the property ID as gicen by user and its own ID to transaction function (explained earlier)
* A new block is created which is passed on with properties of timestamp, block number and values returned from transaction function
* New users are added when a new block is added to the blockchain. Every user is assigned a random stake between 0 and 100 on creation.
* Users with stake greater than or equal to the threshold are made the delegates.

**OUTPUT**

![output](https://user-images.githubusercontent.com/73823079/195996766-e0ccc1c5-06f4-4661-a375-1695d65f56c8.png)
![output](https://user-images.githubusercontent.com/73823079/195996706-294ef335-da9f-453d-b4e7-cce4a95c1d93.png)

### transaction.js
This class is used to specify the buyerID, sellerID, and the timestamp of the transaction that occured.












