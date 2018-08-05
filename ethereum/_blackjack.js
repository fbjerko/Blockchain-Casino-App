import web3 from './web3';
import Blackjack from './build/Blackjack.json';

const instanceB = new web3.eth.Contract(
    JSON.parse(Blackjack.interface),
    '0x71bd7b294A152401353f0AD23BbeAADb30cD3702'
);

export default instanceB;

//0x400E29A55b5D952B82713da5769cA7f96ffaf203