const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledLottery = require("./build/Lottery.json");
const compiledDice = require("./build/Dice.json");
const compiledBlackjack = require("./build/Blackjack.json");

const provider = new HDWalletProvider(
  "embody share enemy eternal wet wing buffalo vapor pepper dress aisle stadium",
  "https://rinkeby.infura.io/orDImgKRzwNrVCDrAk5Q"
);
const web3 = new Web3(provider);

const deployL = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy lottery from account", accounts[0]);

  const lottery = await new web3.eth.Contract(
    JSON.parse(compiledLottery.interface)
  )
    .deploy({ data: compiledLottery.bytecode })
    .send({ gas: "3000000", from: accounts[0] });

  console.log("Lottery contract deployed to", lottery.options.address);
};

const deployD = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy Dice from account", accounts[0]);

  const dice = await new web3.eth.Contract(JSON.parse(compiledDice.interface))
    .deploy({ data: compiledDice.bytecode })
    .send({ gas: "3000000", from: accounts[0] });

  console.log("Dice contract deployed to", dice.options.address);
};

const deployB = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy Blackjack from account", accounts[0]);

  const blackjack = await new web3.eth.Contract(
    JSON.parse(compiledBlackjack.interface)
  )
    .deploy({ data: compiledBlackjack.bytecode })
    .send({ gas: "3000000", from: accounts[0] });

  console.log("Blackjack contract deployed to", blackjack.options.address);
};

deployL();
deployD();
deployB();
