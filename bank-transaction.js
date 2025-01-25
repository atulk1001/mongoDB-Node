// Transfer 200 from Atul Account (ACC123456) to Rakhi Account (ACC123456)
const { v4: uuid } = require("uuid");
const DBConnection = require("./mongoClientv2");

const senderAccountId = "ACC123456";
const recieverAccountId = "ACC11156";
const transactionAmount = 10;

const main = async () => {
  // start the client session
  const instance = new DBConnection();
  const client = await instance.connect();
  const session = client.startSession();

  try {
    // initialize DB and collections

    const db = instance.getDb("finance");
    const accounts = db.collection("accounts");
    const transaction = db.collection("transaction");

    //Step1: update the sender balance

    const transactionResults = await session.withTransaction(async () => {
      const transId = uuid();
      const updateSenderResults = await accounts.updateOne(
        {
          accountNumber: senderAccountId,
        },
        { $inc: { balance: -transactionAmount } },
        { session }
      );
      console.log(`update sender account response: ${updateSenderResults}`);

      //Step2: update the reciever balance

      const updateRecieverResults = await accounts.updateOne(
        {
          accountNumber: recieverAccountId,
        },
        { $inc: { balance: transactionAmount } },
        { session }
      );
      console.log(`Update reciever account response: ${updateRecieverResults}`);
      throw Error("Some error occured");
      // step3: Insert the transfer document
      const transactionResponse = await transaction.insertOne({
        transactionId: transId,
        amount: transactionAmount,
        sender: senderAccountId,
        reciever: recieverAccountId,
        date: new Date(),
      });
      console.log(`Transaction response: ${transactionResponse}`);
      //Step4: update the sender account after transaction complete with status and transferId
      const updateSenderTransaction = await accounts.updateOne(
        {
          accountNumber: senderAccountId,
        },
        { $push: { transferId: transId, transferStatus: "success" } },
        { session }
      );
      console.log(
        `updateSenderTransaction response: ${updateSenderTransaction}`
      );

      //Step:5 update the Reciever account after transaction complete with status and transferId
      const updaterRecieverTransaction = await accounts.updateOne(
        {
          accountNumber: recieverAccountId,
        },
        { $push: { transferId: transId, transferStatus: "success" } },
        { session }
      );
      console.log(
        `updaterRecieverTransaction response: ${updaterRecieverTransaction}`
      );
      return JSON.stringify(updaterRecieverTransaction);
    });
    console.log(`transactionResults: ${transactionResults}`);
    if (transactionResults) {
      console.log("Transaction was successfully created.");
    } else {
      console.log("Transaction was intentionally aborted.");
    }
  } catch (err) {
    console.error(`Transaction Aborted: ${err}`);
    process.exit(1);
  } finally {
    await session.endSession();
  }
};

main();
