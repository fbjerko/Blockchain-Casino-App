pragma solidity ^0.4.4;

contract Lottery {

    address public owner;
    User[] public players;
    


    uint ticketPrice = 0.001 ether;
    uint totalWinners = 1;
    uint totalTickets = 0;
    uint lotteryRound = 0;
    uint totalPlayers = 0;
    uint totalBets = 0;
    uint betStartId = 0;
    address lastWinner;
    
    function Lottery() payable public {
        owner = msg.sender;
    }

    modifier restricted() {
        require(msg.sender == owner);
        _;
    }

    struct User {
        address addr;
        uint tickets;
        uint ticketStart;
        uint ticketEnd;
        uint round;
    }

    function withdraw(uint _amount) external restricted returns (bool) {
        owner.transfer(_amount * 1 ether);
    }

    function getLotteryInfo() public view returns (uint, uint, uint, uint, uint, address) {
        return (
            totalPlayers, 
            totalTickets, 
            ticketPrice, 
            lotteryRound,
            this.balance,
            lastWinner
            );
    }

   

    function placebet() payable external returns (bool) {

        require(msg.value > ticketPrice);

        uint numOfTickets = msg.value/ticketPrice;

        players.push(User(msg.sender, numOfTickets, totalTickets+1, totalTickets+numOfTickets, lotteryRound));
        totalTickets = totalTickets + numOfTickets;
        totalPlayers++;

        if(totalPlayers > 3) {
            draw();
        }

     

        return(true);
    
    }

    function draw() private returns (bool) {

        totalBets = players.length;
        uint pot;
        uint winnerTicket = 0;
        address winnerAdd;


        for (uint i = 0; i < totalWinners; i++) {
            pot = this.balance;
            winnerTicket = uint(keccak256(now, msg.sender, i*totalWinners)) % totalTickets+1;
            
            for (uint j = 0; j < totalPlayers; j++) {
                if (players[betStartId+j].ticketEnd >= winnerTicket) {
                    winnerAdd = players[betStartId+j].addr;
                    winnerAdd.transfer(pot);
                    lastWinner = winnerAdd;
                    break;
                }
            }
        }
        totalPlayers = 0;
        totalTickets = 0;
        betStartId = totalBets+1;
        lotteryRound++;
    }



    function getPot() public view returns (uint) {
        uint _pot;
        _pot = this.balance * 1 ether;
        return _pot;
    }

    function getBalance() public view returns (uint) {
        return this.balance;
    }

}







