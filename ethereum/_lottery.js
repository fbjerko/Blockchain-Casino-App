import web3 from './web3';
import Lottery from './build/Lottery.json';

const instanceL = new web3.eth.Contract(
    JSON.parse(Lottery.interface),
    '0x85c177Cb0821AbF5D83C6c2B24813B179D849761'
);

export default instanceL;

//0xC2A4Ae444a2512210C967aFD3C105a925aDF7C3a