import web3 from './web3';
import Dice from './build/Dice.json';

const instanceD = new web3.eth.Contract(
    JSON.parse(Dice.interface),
    '0x2807A7b605Dd90e9f87C127f6BD80D64AaF10C11'
);

export default instanceD;