import React, { Component } from "react";
import web3 from "../ethereum/web3";
import { Image, Grid, Divider } from "semantic-ui-react";

class Info extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: "",
      balance: "",
      hasProvider: false,
      loading: true
    };
  }

  async componentDidMount() {
    try {
      const accounts = await web3.eth.getAccounts();
      const balance = await web3.eth.getBalance(accounts[0]);
      console.log(accounts);

      this.setState({
        address: accounts[0],
        balance: web3.utils.fromWei(balance, "ether"),
        hasProvider: true
      });
    } catch (err) {
      this.setState({ hasProvider: false });
    }
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading == true) {
      return (
        <div>
          <br /> <br /> <br /> <br /> <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      );
    }
    if (this.state.hasProvider == false && this.state.loading == false) {
      return (
        <div>
          <br />
          <br />
          <h1 align="center">Please log in or install MetaMask to play</h1>

          <Grid centered columns={3}>
            <Grid.Column>
              <Image
                src="../static/metamask.png"
                size="large"
                href="http://metamask.io"
              />
            </Grid.Column>
          </Grid>
          <br />
        </div>
      );
    } else {
      return (
        <div>
          <Divider />

          <br />
          <h1 align="center">Your Balance: {this.state.balance} Ether </h1>
          <h1 align="center">Account: {this.state.address}</h1>
          <br />
        </div>
      );
    }
  }
}

export default Info;
