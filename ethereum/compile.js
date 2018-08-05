const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');
const dicePath = path.resolve(__dirname, 'contracts', 'Dice.sol');
const blackjackPath = path.resolve(__dirname, 'contracts', 'Blackjack.sol');

const sourceL = fs.readFileSync(lotteryPath, 'utf8');
const sourceD = fs.readFileSync(dicePath, 'utf8');
const sourceB = fs.readFileSync(blackjackPath, 'utf8');

const outputL = solc.compile(sourceL, 1).contracts;
const outputD = solc.compile(sourceD, 1).contracts;
const outputB = solc.compile(sourceB, 1).contracts;

fs.ensureDirSync(buildPath);

for (let contract in outputL) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(':', '') + '.json'),
        outputL[contract]
    );
}

for (let contract in outputD) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(':', '') + '.json'),
        outputD[contract]
    );
}

for (let contract in outputB) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(':', '') + '.json'),
        outputB[contract]
    );
}









//const sourceLottery = fs.readFileSync(lotteryPath, 'utf8');
//const sourceDice = fs.readFileSync(dicePath, 'utf8');
//const sourceBlackjack = fs.readFileSync(blackjackPath, 'utf8');