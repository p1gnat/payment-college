const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const accounts = [
  { id: 1, name: "John", cardNumber: "1234-5678-9012-3456", balance: 1000 },
  { id: 2, name: "Ignat", cardNumber: "9876-5432-1098-7654", balance: 500 },
];

let transactions = [];

app.get("/accounts", (req, res) => {
  res.status(200).json(
    accounts.map((elem) => ({
      id: elem.id,
      name: elem.name,
      cardNumber: `****-****-****-${elem.cardNumber.slice(-4)}`,
      cardNumberFull: elem.cardNumber,
      balance: elem.balance,
    }))
  );
});

app.get("/transactions", (req, res) => {
  res.status(200).json(transactions);
});

app.post("/transfer", (req, res) => {
  const { senderCardNumber, receiverCardNumber, amount } = req.body;

  if (!senderCardNumber || !receiverCardNumber || !amount) {
    return res.status(400).json({
      error:
        "Invalid input , double check for values: senderCardNumber, receiverCardNumber or amount",
    });
  }

  const sender = accounts.find((elem) => {
    return senderCardNumber === elem.cardNumber;
  });

  const receiver = accounts.find((elem) => {
    return receiverCardNumber === elem.cardNumber;
  });

  if (!sender || !receiver) {
    return res.status(404).json({
      error: "Sender or Receiver haven't been found",
    });
  }

  if (sender.balance < amount) {
    return res
      .status(400)
      .json({ error: "Not enough money to complete transaction" });
  }

  sender.balance -= amount;
  receiver.balance += amount;

  transactions.push({
    sender: senderCardNumber,
    receiver: receiverCardNumber,
    amount,
    timeStamp: new Date().toISOString(),
  });

  res.status(201).json({
    message: `Transfer between: sender = ${senderCardNumber} ,and receievr = ${receiverCardNumber} / has been successful`,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
