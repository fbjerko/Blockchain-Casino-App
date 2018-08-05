import React, { Component } from "react";
import web3 from "../ethereum/web3";
import lottery from "../ethereum/_lottery";
import Layout from "../components/Layout";
import { Divider, Grid, Image } from "semantic-ui-react";
import LotteryImage from "../components/LotteryImage";
import BuyTicket from "../components/BuyTicket";
import Info from "../components/info";

class LotteryIndex extends Component {
  static async getInitialProps() {
    const lotteryInfo = await lottery.methods.getLotteryInfo().call();
    console.log(lotteryInfo);

    

    const price = web3.utils.fromWei(lotteryInfo[2], "ether");
    return { lotteryInfo, price };
  }

  render() {
    const price = this.props;
    return (
      <Layout>
        <Divider />
        <LotteryImage />
        <Divider />
        <br />
        <div>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Image
                  centered
                  rounded
                  src="../static/totalplayers.png"
                  size="large"
                
                />
              </Grid.Column>

              <Grid.Column>
                <Image
                centered
                  rounded
                  src="../static/totaltickets.png"
                  size="large"
                
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2}>
              <Grid.Column>
                <h1 align="center">{this.props.lotteryInfo[0]}</h1>
              </Grid.Column>

              <Grid.Column>
                <h1 align="center">{this.props.lotteryInfo[1]}</h1>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Image
                  centered
                  rounded
                  src="../static/ticketprice.png"
                  size="large"
                 
                />
              </Grid.Column>

              <Grid.Column>
                <Image
                centered
                  rounded
                  src="../static/lotteryround.png"
                  size="large"
                  
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2}>
              <Grid.Column>
                <h1 align="center">{this.props.price} Ether</h1>
              </Grid.Column>

              <Grid.Column>
                <h1 align="center">{this.props.lotteryInfo[3]}</h1>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
        
        <BuyTicket />
        <Divider/>
        <h1 align="center">Last Winner: {this.props.lotteryInfo[5]}</h1>
  
        
        <Info />
      </Layout>
    );
  }
}

export default LotteryIndex;

/*LotteryInfo
[0] totalPlayers, 
[1]totalTickets, 
[2]ticketPrice, 
[3]lotteryRound, 
this.balance/2, 
this.balance/4, 
this.balance/8);*/
