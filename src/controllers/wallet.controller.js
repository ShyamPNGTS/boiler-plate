const Wallet = require('../models/wallet.model');

const createWallet = async (userId) => {
  try {
    const newWallet = new Wallet({
      userId: userId,
      balance: 0,
    });
    await newWallet.save();
    console.log(`Wallet created for user: ${userId}`);
  } catch (error) {
    console.error('Error creating wallet:', error);
    // Handle error appropriately
  }
};

const withdrawFunds = async (userId, amount) => {
  try {
    const wallet = await Wallet.findOne({ userId });

    if (!wallet) {
      throw new Error('Wallet not found for this user.');
    }

    if (wallet.balance < amount) {
      throw new Error('Insufficient funds in the wallet.');
    }

    wallet.balance -= amount;
    await wallet.save();

    console.log(`Successfully withdrew ${amount} from user ${userId}'s wallet. New balance: ${wallet.balance}`);
    return wallet;
  } catch (error) {
    console.error('Error withdrawing funds:', error);
    throw error; // Re-throw the error for the calling function to handle
  }
};

module.exports = {
  createWallet,
  withdrawFunds,
};