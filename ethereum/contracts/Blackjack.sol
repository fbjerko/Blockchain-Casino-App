pragma solidity ^0.4.4;

contract Blackjack {

    address public owner;

    mapping(address => UserInfo) private userInfo;
    mapping(address => CardInfo) private cardInfo;
    mapping(address => GameInfo) private gameInfo;
   

    function Blackjack() payable public {
        owner = msg.sender;
    }

    modifier restricted() {
        require(msg.sender == owner);
        _;
    }


    function transfer() public payable returns (bool) {
        return true;
    }
    
    function() payable public {}

    function withdraw(uint amount) external restricted returns (bool) {
        owner.transfer(amount);
    }

    struct UserInfo {
        address addr;
        bool isActive;
        uint round;
        uint bet;
        bool gameWin;
        uint winAmount;
        bool activeDealer;
        
    }

    struct GameInfo {
        uint u1;
        uint u2;
        uint u3;
        uint u4;
        uint u5; 
        uint d1;
        uint d2;
        uint d3;
        uint d4; 
        uint d5;
    }

    struct CardInfo {
        uint c1;
        uint c2;
        uint c3;
        uint c4;
        uint c5; 
        uint dc1;
        uint dc2;
        uint dc3;
        uint dc4; 
        uint dc5;
    }

    function getGameInfo() public view returns (
        uint, uint, uint, uint, uint, uint,
        uint, uint, uint, uint, uint, uint
    ){
        return (
        
            gameInfo[msg.sender].u1,
            gameInfo[msg.sender].u2,
            gameInfo[msg.sender].u3,
            gameInfo[msg.sender].u4,
            gameInfo[msg.sender].u5,
            gameInfo[msg.sender].d1,
            gameInfo[msg.sender].d2,
            gameInfo[msg.sender].d3,
            gameInfo[msg.sender].d4,
            gameInfo[msg.sender].d5,
            getSumUser(),
            getSumDealer()
            
        );
    }

    function getCardInfo() public view returns (
        uint, uint, uint, uint, uint, uint,
        uint, uint, uint, uint
    ){
        return (
        
            cardInfo[msg.sender].c1,
            cardInfo[msg.sender].c2,
            cardInfo[msg.sender].c3,
            cardInfo[msg.sender].c4,
            cardInfo[msg.sender].c5,
            cardInfo[msg.sender].dc1,
            cardInfo[msg.sender].dc2,
            cardInfo[msg.sender].dc3,
            cardInfo[msg.sender].dc4,
            cardInfo[msg.sender].dc5

           
            
        );
    }

    function getUserInfo() public view returns (
        address, bool, uint, uint, bool, uint, bool
    ){
        return(
            userInfo[msg.sender].addr,
            userInfo[msg.sender].isActive,
            userInfo[msg.sender].round,
            userInfo[msg.sender].bet,
            userInfo[msg.sender].gameWin,
            userInfo[msg.sender].winAmount,
            userInfo[msg.sender].activeDealer
        );
    }

    function getMaxBet() public view returns (uint) {
        uint maxBet = this.balance / 2;
        return maxBet;
    }

    function startGame() external payable returns (bool) {

        require(msg.value <= this.balance / 2 && msg.value > 0);

        userInfo[msg.sender] = UserInfo(msg.sender, true, 1, msg.value, false, 0, true);
        gameInfo[msg.sender] = GameInfo(getNumberUser(1), getNumberUser(2), 0, 0, 0, getNumberDealer(3), getNumberDealer(4), 0, 0, 0);
        cardInfo[msg.sender] = CardInfo(cardNumber(1),cardNumber(5), cardNumber(99), 4, 1, cardNumber(3), cardNumber(9), cardNumber(43), 2, 4);
    
        if(getSumUser() == 21 || getSumDealer() == 21) {
            
            userInfo[msg.sender].round = 5;
            if (payOut() == true) {
                userInfo[msg.sender].gameWin = true;
                userInfo[msg.sender].winAmount = (userInfo[msg.sender].bet * 2);
                msg.sender.transfer((userInfo[msg.sender].bet * 250) / 100);
                }

    }
        return true;
    }

    function cardNumber(uint _num) internal returns (uint) {
        uint num = uint(keccak256(now, msg.sender, _num)) % 4 + 1;
        return num;
    }


    function draw() external returns (bool) {

        require(userInfo[msg.sender].isActive == true);

        userInfo[msg.sender].round++;

        if (userInfo[msg.sender].round == 2) {
            gameInfo[msg.sender].u3 = getNumberUser(7);
            

            if (dealerLogic() == true && userInfo[msg.sender].activeDealer == true) 
            gameInfo[msg.sender].d3 = getNumberDealer(11);
        }

        if (userInfo[msg.sender].round == 3) {
            gameInfo[msg.sender].u4 = getNumberUser(15);
                
            if (dealerLogic() == true && userInfo[msg.sender].activeDealer == true) 
            gameInfo[msg.sender].d4 = getNumberDealer(19);
        }

        if (userInfo[msg.sender].round == 4) {
            gameInfo[msg.sender].u5 = getNumberUser(27);
                
            if (dealerLogic() == true && userInfo[msg.sender].activeDealer == true) 
            gameInfo[msg.sender].d5 = getNumberDealer(33);
        }

        if (payOut() == true) {
            userInfo[msg.sender].gameWin = true;
            userInfo[msg.sender].winAmount = (userInfo[msg.sender].bet * 2);
            msg.sender.transfer(userInfo[msg.sender].bet * 2);
        }
    
        return true;
    }

    function stand() external returns (bool) {

        require(userInfo[msg.sender].isActive == true);
        //require(msg.senderrToGameNr[msg.sender] == userInfo[msg.sender].gameNr);

        userInfo[msg.sender].round++;

        if (userInfo[msg.sender].round == 2) {

            if (dealerLogic() == true && userInfo[msg.sender].activeDealer == true){ 
                gameInfo[msg.sender].d3 = getNumberDealer(37);

                if (dealerLogic() == true) 
                    gameInfo[msg.sender].d4 = getNumberDealer(43);

                if (dealerLogic() == true) 
                    gameInfo[msg.sender].d5 = getNumberDealer(49);
        }
            userInfo[msg.sender].round = 5;
    }

        if (userInfo[msg.sender].round == 3) {
            
            if (dealerLogic() == true && userInfo[msg.sender].activeDealer == true) { 
                gameInfo[msg.sender].d4 = getNumberDealer(57);

                if (dealerLogic() == true) 
                    gameInfo[msg.sender].d5 = getNumberDealer(63);
            }
            userInfo[msg.sender].round = 5;
        }

        if (userInfo[msg.sender].round == 4) {

            if (dealerLogic() == true && userInfo[msg.sender].activeDealer == true) 
                gameInfo[msg.sender].d5 = getNumberDealer(77);
        }

        if (payOut() == true) {
            userInfo[msg.sender].gameWin = true;
            userInfo[msg.sender].winAmount = (userInfo[msg.sender].bet * 2);
            msg.sender.transfer(userInfo[msg.sender].bet * 2);
        }

        return true;
    }

    function getSumUser() private view returns (uint) { 

        uint temp = 0;

        if(gameInfo[msg.sender].u1 > 11) 
        temp = temp + (gameInfo[msg.sender].u1 - 10);
        if(gameInfo[msg.sender].u2 > 11) 
        temp = temp + (gameInfo[msg.sender].u2 - 10);
        if(gameInfo[msg.sender].u3 > 11) 
        temp = temp + (gameInfo[msg.sender].u3 - 10);
        if(gameInfo[msg.sender].u4 > 11) 
        temp = temp + (gameInfo[msg.sender].u4 - 10);
        if(gameInfo[msg.sender].u5 > 11) 
        temp = temp + (gameInfo[msg.sender].u5 - 10);
    
        uint sum = (gameInfo[msg.sender].u1 + gameInfo[msg.sender].u2 + gameInfo[msg.sender].u3 + gameInfo[msg.sender].u4 + gameInfo[msg.sender].u5);

        sum = sum - temp;
        return sum;
    }

    function getSumDealer() private view returns (uint) {

        uint temp2 = 0;

        if(gameInfo[msg.sender].d1 > 11) 
        temp2 = temp2 + (gameInfo[msg.sender].d1 - 10);
        if(gameInfo[msg.sender].d2 > 11) 
        temp2 = temp2 + (gameInfo[msg.sender].d2 - 10);
        if(gameInfo[msg.sender].d3 > 11) 
        temp2 = temp2 + (gameInfo[msg.sender].d3 - 10);
        if(gameInfo[msg.sender].d4 > 11) 
        temp2 = temp2 + (gameInfo[msg.sender].d4 - 10);
        if(gameInfo[msg.sender].d5 > 11) 
        temp2 = temp2 + (gameInfo[msg.sender].d5 - 10);
    
        uint sum = (gameInfo[msg.sender].d1 + gameInfo[msg.sender].d2 + gameInfo[msg.sender].d3 + gameInfo[msg.sender].d4 + gameInfo[msg.sender].d5);

        sum = sum - temp2;
        return sum;
    }

    function getNumberUser(uint _num) private view returns (uint) {

        uint num = uint(keccak256(now, msg.sender, _num)) % 13 + 1;
        
        if (num == 11) {
            num = 14;
        }

        if (num == 1 && getSumUser() < 12) {
            num = 11;
        }
        return num;
    }

    function getNumberDealer(uint _num) private view returns (uint) {

        uint num = uint(keccak256(now, msg.sender, _num)) % 13 + 1;
        
        if (num == 11) {
            num = 14;
        }

        if (num == 1 && getSumDealer() < 11) {
            num = 11;
        }
        return num;
    }

    function dealerLogic() private returns (bool) {

        if (getSumDealer() >= 17) { //Hvis dealer har 17 eller høyere, ikke trekk
            userInfo[msg.sender].activeDealer == false;
            return false;
        }

        if (getSumDealer() < 17) { //Hvis dealer har 16 eller mindre...


            if (getSumUser() > 21){ //Hvis spiller har 22 eller mere, ikke trekk
                userInfo[msg.sender].activeDealer == false;
                return false;
            }

            if (getSumDealer() < getSumUser() && getSumUser() < 22) 
                return true;  // Trekker hvis dealer har dårligere hånd enn spiller, og spiller har 21 eller mindre
            
            return true;
        }
    }

    function payOut() private returns (bool) {

        if (getSumUser() == 21 && getSumDealer() == 21) {
            userInfo[msg.sender].bet = userInfo[msg.sender].bet/2;
            userInfo[msg.sender].isActive = false;
            return true;
        }

        if (getSumUser() == 21 && getSumDealer() > 21) {
            userInfo[msg.sender].isActive = false;
            return true;
        }
        if (getSumUser() == 21 && getSumDealer() < 21) {
            if(getSumDealer() >= 16){
                userInfo[msg.sender].isActive = false;
                return true;
            }
        }
        if (getSumUser() < 22 && getSumDealer() > 21) {
            userInfo[msg.sender].isActive = false;
            return true;
            }

        if (getSumDealer() == 21 && getSumUser() > 21) {
            userInfo[msg.sender].isActive = false;
            return false;
        }
        

        if (getSumDealer() < 22 && getSumUser() > 21) {
            userInfo[msg.sender].isActive = false;
            return false;
        }
    
        if (userInfo[msg.sender].round >= 4) {

            if (getSumUser() < getSumDealer()) {
                userInfo[msg.sender].isActive = false;
                return false;
            }

            if (getSumUser() == getSumDealer()) {
                userInfo[msg.sender].bet = userInfo[msg.sender].bet/2;
                userInfo[msg.sender].isActive = false;
                return true;
            }

            if (getSumUser() > getSumDealer()) {
                userInfo[msg.sender].isActive = false;
                return true;
            }
        } 
        
        if (getSumUser() < getSumDealer())
            return false;
    }
}
