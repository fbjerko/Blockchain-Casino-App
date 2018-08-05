import React, { Component } from "react";
import web3 from "../ethereum/web3";
import dice from "../ethereum/_dice";
import Layout from "../components/Layout";
import { Divider, Grid, Image } from "semantic-ui-react";
import DiceImage from "../components/DiceImage";
import RollDice from "../components/RollDice";
import Info from "../components/info";

class DiceIndex extends Component {

  constructor(props) {
    super(props);

    this.state = {
      info: [],
      balance: "",
      winAmount: "",
      winLast: false,
      address: "",
      lost: ""

    };
  }


  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    const diceInfo = await dice.methods.getUserInfo().call({
      from: accounts[0]
    });

    const balance = await dice.methods.getMaxWin().call({
      from: accounts[0]
    });
    const winAmount = web3.utils.fromWei(diceInfo[4], "ether");
    const wonLast = diceInfo[3];
    const lost = web3.utils.fromWei(diceInfo[2], "ether");
    

    this.setState({
      info: diceInfo,
      balance: web3.utils.fromWei(balance, "ether"),
      winAmount: winAmount,
      winLast: diceInfo[3],
      address: accounts[0],
      lost: lost
    });

    if(diceInfo[4] != 0){
      this.setState({
        winLast: true
      })
    }
    console.log(diceInfo);

    
    

  }

  render() {

    if(this.state.winLast == true) {
      return (
        <Layout>
        <Divider />
        <DiceImage />
        <Divider />
        <br />
        <div>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Image
                  centered
                  rounded
                  src="../static/yournumber.png"
                  size="large"
                
                />
              </Grid.Column>

              <Grid.Column>
                <Image
                centered
                  rounded
                  src="../static/yourolled.png"
                  size="large"
                
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2}>
              <Grid.Column>
                <h1 align="center"># {this.state.info[0]}</h1>
              </Grid.Column>

              <Grid.Column>
                <h1 align="center"># {this.state.info[1]}</h1>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={1}>
              <Grid.Column>
                <Image
                  centered
                  rounded
                  src="../static/youwon.png"
                  size="large"
                 
                />
              </Grid.Column>

            
            </Grid.Row>

            <Grid.Row columns={1}>
              <Grid.Column>
              <Divider />
              <h1 align="center">{this.state.winAmount} Ether</h1>
              <Divider />
              </Grid.Column>

            </Grid.Row>
          </Grid>
        </div>
        
        <RollDice />
        <h1 align="center">Game Balance: {this.state.balance} Ether</h1>
        <Info />
      </Layout>
      );
    }

    if(this.state.winLast == false && this.state.address != "") {
      return (
        <Layout>
        <Divider />
        <DiceImage />
        <Divider />
        <br />
        <div>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Image
                  centered
                  rounded
                  src="../static/yournumber.png"
                  size="large"
                
                />
              </Grid.Column>

              <Grid.Column>
                <Image
                centered
                  rounded
                  src="../static/yourolled.png"
                  size="large"
                
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2}>
              <Grid.Column>
                <h1 align="center"># {this.state.info[0]}</h1>
              </Grid.Column>

              <Grid.Column>
                <h1 align="center"># {this.state.info[1]}</h1>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={1}>
              <Grid.Column>
                <Image
                  centered
                  rounded
                  src="../static/youlost.png"
                  size="large"
                 
                />
              </Grid.Column>

            
            </Grid.Row>

            <Grid.Row columns={1}>
              <Grid.Column>
              <Divider />
              <h1 align="center">{this.state.lost} Ether</h1>
              <Divider />
              </Grid.Column>

            </Grid.Row>
          </Grid>
        </div>
        
        <RollDice />
        <h1 align="center">Game Balance: {this.state.balance} Ether</h1>
        <Info />
      </Layout>
      );
    }
   
    return (
      <Layout>
        <Divider />
        <DiceImage />
        <Divider />
        <br />
        <div>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Image
                  centered
                  rounded
                  src="../static/yournumber.png"
                  size="large"
                
                />
              </Grid.Column>

              <Grid.Column>
                <Image
                centered
                  rounded
                  src="../static/yourolled.png"
                  size="large"
                
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2}>
              <Grid.Column>
                <h1 align="center">{this.state.info[0]}</h1>
              </Grid.Column>

              <Grid.Column>
                <h1 align="center">{this.state.info[1]}</h1>
              </Grid.Column>
            </Grid.Row>
          
          </Grid>
        </div>
        
        <RollDice />
        <h1 align="center">Game Balance: {this.state.balance} Ether</h1>
        <Info />
      </Layout>
    );
  }
}

export default DiceIndex;

/*LotteryInfo
[0] totalPlayers, 
[1]totalTickets, 
[2]ticketPrice, 
[3]lotteryRound, 
this.balance/2, 
this.balance/4, 
this.balance/8);*/
