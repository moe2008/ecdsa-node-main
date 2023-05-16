const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "03d3df72a2eb647f0d0b4377f8b794588c66fe2c0bc8935d72edd1e722e0922c99": 100,
  "02184b387d5d3dea4ad68ed30fd57fdfceb58aafd20f52fe089dfbcab05a8b9e1b": 50,
  "022b94f253cf55b074d382a026a4c297f73492db8867246ccca51f74dcb1186c7a": 75,
};

const privates = [
  "6278b9eb8b4c0bcc871910f918549cf718fc5c4cc36b70e0e291204d15d01b03",
  "bdd4000de5cb76add7c532e9a5779a95c0a474268c0387ce4bc03b45bf8495ca",
  "8fdd6b4b393712269b48cfe87c89ee71525009406a938350e954cf03b5628b3f",
  // False Private Key
  "8fdd6b4b393712269b48cfe87c89ee71525009406a938350e954cf03b5628b3d"
];

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  // get signed tx from client
  // recover the public address from it
  const { sender, recipient, amount, signature } = req.body;

  console.log(signature);
  console.log(sender);

  if (sender === signature) {
    setInitialBalance(sender);
    setInitialBalance(recipient);

    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
  } else {
    res.status(400).send({ message: "Not allowed to transfer funds" });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
