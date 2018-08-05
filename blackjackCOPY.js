import React, { Component } from "react";
import { Card, Input, Button, Message, Form, Grid } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import blackjack from "../ethereum/_blackjack";
import Layout from "../components/Layout";
import { Link, Router } from "../routes";

class BlackjackIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      address: "",
      isActive: false,
      round: "",
      bet: "",
      gameWin: false,
      winAmount: "",
      loadingPage: true,
      errorMessage: "",
      loadingStart: false,
      loadingHit: false,
      loadingStand: false,
      hit: false,
      stand: false,
      startGame: false,
      betAmount: "",
      maxBet: ""

      /*uCard1: "",
        uCard2: "",
        uCard3: "",
        uCard4: "",
        uCard5: "",
        sumUser: "",
        dCard1: "",
        dCard2: "",
        dCard3: "",
        dCard4: "",
        dCard5: "",
        sumDealer: ""*/
    };
  }

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    const userInfo = await blackjack.methods.getUserInfo().call({
      from: accounts[0]
    });
    const gameInfo = await blackjack.methods.getGameInfo().call({
      from: accounts[0]
    });
    const maxBet = await blackjack.methods.getMaxBet().call({
      from: accounts[0]
    });

    this.setState({
      cards: gameInfo,
      address: userInfo[0],
      isActive: userInfo[1],
      round: userInfo[2],
      bet: userInfo[3],
      gameWin: userInfo[4],
      winAmount: userInfo[5],
      loadingPage: false,
      startGame: !userInfo[1],
      maxBet: web3.utils.fromWei(maxBet, "ether")
    });
  }

  renderCards() {
    const items = [
      {
        header: this.state.cards[0],
        description: "Bruker Kort 1",
        fluid: true,
        hidden: true
      },
      {
        header: this.state.cards[1],
        description: "Bruker Kort 2",
        fluid: true
      },
      {
        header: this.state.cards[2],
        description: "Bruker Kort 3",
        fluid: true
      },
      {
        header: this.state.cards[3],
        description: "Bruker Kort 4",
        fluid: true
      },
      {
        header: this.state.cards[4],
        description: "Bruker Kort 5",
        fluid: true
      },
      {
        header: this.state.cards[6],
        description: "Dealer Kort 1",
        fluid: true
      },
      {
        header: this.state.cards[7],
        description: "Dealer Kort 2",
        fluid: true
      },
      {
        header: this.state.cards[8],
        description: "Dealer Kort 3",
        fluid: true
      },
      {
        header: this.state.cards[9],
        description: "Dealer Kort 4",
        fluid: true
      },
      {
        header: this.state.cards[10],
        description: "Dealer Kort 5",
        fluid: true
      },
      {
        header: this.state.cards[5],
        description: "Sum Bruker",
        fluid: true
      },
      {
        header: this.state.cards[11],
        description: "Sum Dealer",
        fluid: true
      }
    ];

    return <Card.Group items={items} />;
  }

  onClick = async event => {
    if (this.state.stand == undefined && this.state.hit == undefined) {
      event.preventDefault();
    }

    this.setState({ errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();
      if (this.state.hit === true) {
        this.setState({ loadingHit: true });
        await blackjack.methods.draw().send({
          from: accounts[0],
          gasLimit: 300000
        });
        this.setState({ hit: false });
      }
      if (this.state.stand === true) {
        this.setState({ loadingStand: true });
        await blackjack.methods.stand().send({
          from: accounts[0],
          gasLimit: 300000
        });
        this.setState({ stand: false });
      }
      if (this.state.startGame === true) {
       if(this.state.betAmount > this.state.maxBet) {
         this.setState({ errorMessage: "Bet amount too high"})
         return;
       }
        this.setState({ loadingStart: true });
        await blackjack.methods.startGame().send({
          value: web3.utils.toWei(this.state.betAmount, "ether"),
          from: accounts[0]
        });
      }
      this.renderCards();
    } catch (err) {
      this.setState({ errorMessage: err.message.split("\n")[0] });
    }
    this.setState({ loadingStart: false });
    this.setState({ loadingStand: false });
    this.setState({ loadingHit: false });
    this.componentDidMount();
  };

  standClick = () => {
    this.setState({ stand: true });
    console.log(this.state.stand);
    this.onClick();
  };

  hitClick = () => {
    this.setState({ hit: true });
    console.log(this.state.hit);
    this.onClick();
  };

  render() {
    if (this.state.loadingPage === true) {
      console.log("Har ikke loaded");
      return (
        <div>
          <h2>Loading, please wait</h2>
        </div>
      );
    }

    if (this.state.loadingPage === false) {
      return (
        <Layout>
                    <Grid>
          <Grid.Row>
          <div>

            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
         

            <h3>Select your next move</h3>

            <Form onSubmit={this.onClick} error={!!this.state.errorMessage}>
              <Form.Field>
                <label>Enter Bet Amount</label>
                <label>Max Bet: {this.state.maxBet} Ether</label>
                <Input
                  label="Ether"
                  labelPosition="right"
                  placeholder="Enter amount"
                  disabled={this.state.isActive}
                  value={this.state.betAmount}
                  onChange={event =>
                    this.setState({ betAmount: event.target.value })
                  }
                />
              </Form.Field>
              <Message
                error
                header="Oops!"
                content={this.state.errorMessage}
              />
              <Button
                loading={this.state.loadingStart}
                disabled={this.state.isActive}
                primary
              >
                {"Start Game"}
              </Button>
              </Form>


            <Button
              loading={this.state.loadingHit}
              onClick={this.hitClick}
              disabled={!this.state.isActive}
              primary
            >
              {"Hit"}
            </Button>

            <Button
              loading={this.state.loadingStand}
              onClick={this.standClick}
              disabled={!this.state.isActive}
              primary
            >
              {"Stand"}
            </Button>


            <h1>Player address: {this.state.address}</h1>
            <h1>In play: {String(this.state.isActive)} </h1>
            <h1>Round: {this.state.round}</h1>
            <h1>Your Bet: {this.state.bet}</h1>
            <h1>Won last game: {String(this.state.gameWin)} </h1>
            <h1>Last game win amount: {this.state.winAmount}</h1>
          </div>

                    </Grid.Row>
        </Grid>
        </Layout>
      );
    }
  }
}

export default BlackjackIndex;

//<h1>{this.renderCards()}</h1>

/*UserInfo
0 - addr,
1 - isActive,
2 - round,
3 - bet,
4 - gameWin,
5 - winAmount

GameInfo: 

0 - User Card 1,
1 - User Card 2,
2 - u3,
3 - u4,
4 - u5,
5 - getSumUser(),
6 - Dealer Card 1,
7 - Dealer Card 2,
8 - d3,
9 - d4,
10 - d5,
11 - getSumDealer()





 <Grid>
            <Grid.Column columns={1}>
            <Button
                  loading={this.state.loadingHit}
                  onClick={this.hitClick}
                  disabled={!this.state.isActive}
                  primary
                >
                  {"Hit"}
                </Button>
                <Button
                  loading={this.state.loadingStand}
                  onClick={this.standClick}
                  disabled={!this.state.isActive}
                  primary
                >
                  {"Stand"}
                </Button>
                </Grid.Column>
                </Grid>
  


*/
