import React, { Component } from "react";
import {
  Popup,
  Button,
  Header,
  Image,
  Modal,
  Grid,
  Form,
  Input,
  Message
} from "semantic-ui-react";
import web3 from "../ethereum/web3";
import dice from "../ethereum/_dice";
import { Link, Router } from "../routes";

class RollDice extends Component {
  state = { open: false,
            value: "",
            errorMessage: "",
            loading: false,
            number: ""
};

  show = size => () => this.setState({ size, open: true });
  close = () => this.setState({ open: false });

  

  onClick = async event => {

      event.preventDefault();
      this.setState({ loading: true})
    
   
    
    this.setState({ errorMessage: "", loading: true });
  

    const total = this.state.value * 100000000000000000;
   
    const num = this.state.number;


    try {
      const accounts = await web3.eth.getAccounts();
        await dice.methods.rollDice(num).send({
          from: accounts[0],
          value: total,
          gasLimit: 500000
        });
      }
      
    
    catch (err) {
      this.setState({ errorMessage: err.message.split("\n")[0] });
    }
   
    this.setState({ loading: false, open: false})
    Router.pushRoute(`/dice`);
    this.render();
    this.close();

  };

  render() {
    const { open, size } = this.state;

    return (
      <div>
        <br />

        <Grid centered columns={3}>
          <Grid.Column>
          <Image onClick={this.show('tiny')} src="../static/rolldice.png" size="large" />
            <Modal size={size} open={open} onClose={this.close} centered style={{ size: "300px",marginTop: "350px", marginLeft: "900px", position:"center" }}
            
               
            
            >
            
              <Modal.Header>% chance of winning</Modal.Header>
              <Modal.Content form >
                <Form onSubmit={this.onClick} error={!!this.state.errorMessage}>
                  <Form.Field centered>
                    <label>Enter Number of Tickets</label>
                   
                    <Input
                      label="%"
                      labelPosition="right"
                      placeholder="%"
                      value={this.state.number}
                      onChange={event =>
                        this.setState({ number: event.target.value })
                      }
                    />
                  </Form.Field>
                  <Message
                    error
                    header="Oops!"
                    content={this.state.errorMessage}
                  
                  />
                  <Button.Group color="grey">
                  <Button onClick={event => this.setState({ value: 0.01 })}>
                  {"0.01 ETH"}
                </Button>
                <Button onClick={event => this.setState({ value: 0.1 })}>
                  {"0.1 ETH"}
                </Button>
                <Button onClick={event => this.setState({ value: 0.25 })}>
                  {"0.25 ETH"}
                </Button>
                <Button onClick={event => this.setState({ value: 0.5 })}>
                  {"0.5 ETH"}
                </Button>
                <Button onClick={event => this.setState({ value: 1 })}>
                  {"1 ETH"}
                
                  </Button>
                  </Button.Group>
                  
                </Form>
                <br/>
                <Button
                   fluid
                   color="grey"
                   loading={this.state.loading}
                    onClick={this.close}
                  >
                    {"Close "}
                  </Button>
              </Modal.Content>
            </Modal>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default RollDice;
