import React, { Component } from "react";
import {
  Card,
  Divider,
  Image,
  Input,
  Button,
  Message,
  Form,
  Grid
} from "semantic-ui-react";
import web3 from "../ethereum/web3";
import blackjack from "../ethereum/_blackjack";
import Layout from "../components/Layout";
import Info from "../components/info";
import BJImage from "../components/BlackjackImage";

class BlackjackIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      cardInfo: [],
      address: "",
      isActive: false,
      round: "",
      bet: "",
      gameWin: false,
      winAmount: "",
      loadingPage: true,
      errorMessage: "",
      loadingHit: false,
      loadingStand: false,
      loadingStart: false,
      hit: false,
      stand: false,
      startGame: false,
      betAmount: "",
      maxBet: "",
      gameMessage: "Last Game",
      activeDealer: false,
      dealerMessage: "Current Game",
      loading: false,
      pending: false,
      txhash: ""

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
    const cardInfo = await blackjack.methods.getCardInfo().call({
      from: accounts[0]
    });
    const maxBet = await blackjack.methods.getMaxBet().call({
      from: accounts[0]
    });

    this.setState({
      cards: gameInfo,
      cardInfo: cardInfo,
      address: userInfo[0],
      isActive: userInfo[1],
      round: userInfo[2],
      bet: userInfo[3],
      gameWin: userInfo[4],
      winAmount: web3.utils.fromWei(userInfo[5], "ether"),
      loadingPage: false,
      loadingHit: false,
      loadingStart: false,
      loadingStand: false,
      startGame: !userInfo[1],
      maxBet: web3.utils.fromWei(maxBet, "ether"),
      activeDealer: userInfo[6]
    });

    if (userInfo[4] == true && userInfo[1] == false) {
      this.setState({
        dealerMessage: `You won ${this.state.winAmount} ether `
      });
    } else if (userInfo[1] == false && userInfo[4] == false) {
      this.setState({
        dealerMessage: "You lost!"
      });
    } else if (userInfo[6] == false) {
      this.setState({
        dealerMessage: "Dealer stands"
      });
    } else if (userInfo[1] == true) {
      this.setState({
        gameMessage: "Current Game"
      });
    } else {
      this.setState({
        gameMessage: "Current Game"
      });
    }
  }

  renderCards() {
    if (this.state.cards[0] == 0) {
      return (
        <div>
          <Grid columns={1}>
            <Grid.Column>
              <Image
                centered
                rounded
                src="../static/blackjackBet.png"
                size="massive"
              />
            </Grid.Column>
          </Grid>
        </div>
      );
    }

    if (this.state.round == 1) {
      return (
        <div>
          <Divider />
          <h1 align="center">Dealer</h1>  
          <Card.Group
            itemsPerRow={5}
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
            <Card raised image={`../static/${this.state.cards[5]}${this.state.cardInfo[5]}.png`} />
            <Card raised image={`../static/backside.jpg`} />
            <Card raised image={`../static/${this.state.cards[7]}${this.state.cardInfo[7]}.png`} />
            <Card raised image={`../static/${this.state.cards[8]}${this.state.cardInfo[8]}.png`} />
            <Card raised image={`../static/${this.state.cards[9]}${this.state.cardInfo[9]}.png`} />
          </Card.Group>
          <Divider />
          <Card.Group itemsPerRow={5}>
            <Card raised image={`../static/${this.state.cards[0]}${this.state.cardInfo[0]}.png`} />
            <Card raised image={`../static/${this.state.cards[1]}${this.state.cardInfo[1]}.png`} />
            <Card raised image={`../static/${this.state.cards[2]}${this.state.cardInfo[2]}.png`} />
            <Card raised image={`../static/${this.state.cards[3]}${this.state.cardInfo[3]}.png`} />
            <Card raised image={`../static/${this.state.cards[4]}${this.state.cardInfo[4]}.png`} />
          </Card.Group>
          <h1 align="center">Player: {this.state.cards[10]}</h1>
          <Divider />
        </div>
      );
    }

    return (
      <div>
        <Divider />
        <h1 align="center">Dealer: {this.state.cards[11]} </h1>

        <Card.Group
          itemsPerRow={5}
          style={{ marginTop: "20px", marginBottom: "20px" }}
        >
            <Card raised image={`../static/${this.state.cards[5]}${this.state.cardInfo[5]}.png`} />
            <Card raised image={`../static/${this.state.cards[6]}${this.state.cardInfo[6]}.png`} />
            <Card raised image={`../static/${this.state.cards[7]}${this.state.cardInfo[7]}.png`} />
            <Card raised image={`../static/${this.state.cards[8]}${this.state.cardInfo[8]}.png`} />
            <Card raised image={`../static/${this.state.cards[9]}${this.state.cardInfo[9]}.png`} />
        </Card.Group>
        <Divider />
        <Card.Group itemsPerRow={5}>
            <Card raised image={`../static/${this.state.cards[0]}${this.state.cardInfo[0]}.png`} />
            <Card raised image={`../static/${this.state.cards[1]}${this.state.cardInfo[1]}.png`} />
            <Card raised image={`../static/${this.state.cards[2]}${this.state.cardInfo[2]}.png`} />
            <Card raised image={`../static/${this.state.cards[3]}${this.state.cardInfo[3]}.png`} />
            <Card raised image={`../static/${this.state.cards[4]}${this.state.cardInfo[4]}.png`} />
        </Card.Group>
        <h1 align="center">Player has {this.state.cards[10]}</h1>
        <Divider />
      </div>
    );
  }

  onClick = async event => {
    console.log(this.state.pending);
    if (this.state.stand == undefined && this.state.hit == undefined) {
      event.preventDefault();
    }

    this.setState({ errorMessage: "", loadingStart: true});

    try {
      const accounts = await web3.eth.getAccounts();
      if (this.state.hit === true) {
        this.setState({ errorMessage: "" });
        await blackjack.methods.draw().send({
          from: accounts[0],
          gasLimit: 300000
        });
        this.setState({ hit: false });
      }
      if (this.state.stand === true) {
        await blackjack.methods.stand().send({
          from: accounts[0],
          gasLimit: 300000
        });
        this.setState({ stand: false });
      }
      if (this.state.startGame === true) {
        if (this.state.betAmount > this.state.maxBet) {
          this.setState({
            errorMessage: "Bet amount too high", loadingStart: false
          });

          return;
        }

        await blackjack.methods.startGame().send({
          value: web3.utils.toWei(this.state.betAmount, "ether"),
          from: accounts[0]
        });
      }
    } catch (err) {
      this.setState({
        errorMessage: err.message.split("\n")[0],
        pending: false
      });
    }

    this.setState({
      loadingStart: false,
      loadinghit: false,
      loadingStand: false
    });
    console.log(this.state.txhash);

    this.componentDidMount();
  };

  standClick = () => {
    this.setState({ stand: true, loadingStand: true });

    this.onClick();
  };

  hitClick = () => {
    this.setState({ hit: true, loadingHit: true });

    this.onClick();
  };

  pending() {
    if (this.state.pending == true) {
      return (
        <div>
          <h1 align="center">Waiting for your transaction to be mined..</h1>
          <a align="center" href={this.state.txhash}>
            Check Transaction
          </a>

          <Image centered src="../static/pending.gif" size="small" />
          <Divider />
        </div>
      );
    } else {
      return <div />;
    }
  }

  render() {
    if (this.state.loadingPage === true) {
      console.log("Har ikke loaded");
      return (
        <div>
          <Layout>
            <BJImage />
          </Layout>
        </div>
      );
    }

    if (this.state.loadingPage === false && this.state.isActive == true) {
      return (
        <Layout>
          <Divider />
          <BJImage />

          <h1 align="center">{this.state.dealerMessage}</h1>
          {this.renderCards()}
<h1 align="center">Choose your next move</h1>
          <Grid centered columns={3}>
            <Grid.Column>
              <Button
                loading={this.state.loadingHit}
                floated="right"
                primary
                size="massive"
                onClick={this.hitClick}
              >
                {"HIT"}
              </Button>
            </Grid.Column>

            <Grid.Column>
            <Button
                loading={this.state.loadingStand}
                floated="left"
                primary
                size="massive"
                onClick={this.standClick}
              >
                {"STAND"}
              </Button>
              
            </Grid.Column>
          </Grid>

          <Info />
        </Layout>
      );
    }

    if (this.state.loadingPage === false && this.state.isActive == false) {
      return (
        <Layout>
          <Divider />
          <BJImage />
          <h1 align="center">{this.state.dealerMessage}</h1>
          {this.renderCards()}
        
          <Grid centered columns={5}>
            <Grid.Column>
              <Form onSubmit={this.onClick} error={!!this.state.errorMessage}>
                <Form.Field width="15">
                  <h2 align="center">Enter Bet Amount</h2>
                  <label align="center">
                    Max Bet: {this.state.maxBet} Ether
                  </label>
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

                <Button loading={this.state.loadingStart} primary size="massive" 
               
                >
                  {"Start Game"}
                </Button>
              </Form>
            </Grid.Column>
          </Grid>
          <Info />
        </Layout>
      );
    }
  }
}

export default BlackjackIndex;

/*
 <Grid.Column>
                
              </Grid.Column> */
