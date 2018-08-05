pragma solidity ^0.4.4;

contract Dice {

    address public owner;
    uint maxBet;
    uint randNonce = 0;

    mapping(address => UserInfo) private userInfo;

    function Dice() payable public {
        owner = msg.sender;
        maxBet = 1.1 ether;
    }

    modifier restricted() {
        require(msg.sender == owner);
        _;
    }

    function withdraw(uint amount) external restricted returns (bool) {
        owner.transfer(amount);
    }

    function transfer() public payable returns (bool) {
        return true;
    }

    function() payable public {}
    
    struct UserInfo {
        uint minNumber;
        uint drawnNumber;
        uint betAmount;
        bool wonLast;
        uint winAmount;
    }

    function getUserInfo() public view returns (uint, uint, uint, bool, uint) {
        return (
        userInfo[msg.sender].minNumber,
        userInfo[msg.sender].drawnNumber,
        userInfo[msg.sender].betAmount,
        userInfo[msg.sender].wonLast,
        userInfo[msg.sender].winAmount
        );
    }

    function getMaxWin() public view returns (uint) {
        return this.balance;
    }

   

    function getMaxBet() public view returns (uint) {
        return maxBet;
    }

    function rollDice(uint _minNumber) public payable returns (bool) {

        require(msg.value > 0 && _minNumber < 100 && _minNumber > 1);

        uint random = uint(keccak256(now, msg.sender, randNonce)) % 100 + 1;
        userInfo[msg.sender] = UserInfo(_minNumber, random, msg.value, false, 0);
        randNonce++;

        if (random < _minNumber) {
            
            userInfo[msg.sender].winAmount = (msg.value * 100) /_minNumber;
         
            msg.sender.transfer( (msg.value * 100) /_minNumber);
           
            userInfo[msg.sender].wonLast = true;
        }
        return true;
    }
}
