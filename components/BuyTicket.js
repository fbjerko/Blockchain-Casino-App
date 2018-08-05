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
  Message,
  Divider
} from "semantic-ui-react";
import web3 from "../ethereum/web3";
import lottery from "../ethereum/_lottery";
import { Link, Router } from "../routes";

class BuyTicket extends Component {
  state = { open: false,
            numOfTicks: "",
            errorMessage: "",
            loading: false,
            loadingDraw: false
};

  show = size => () => this.setState({ size, open: true });
  close = () => this.setState({ open: false });

  

  onClick = async event => {

      event.preventDefault();
      this.setState({ loading: true})
    
    console.log("HEI");
    
    this.setState({ errorMessage: "", loading: true });
    console.log(this.state.numOfTicks);

    const total = this.state.numOfTicks * 1000000000000000;
    console.log(total)


    try {
      const accounts = await web3.eth.getAccounts();
        await lottery.methods.placebet().send({
          from: accounts[0],
          value: total,
          gasLimit: 1000000
        });
      }
     
       
        
      
    
    catch (err) {
      this.setState({ errorMessage: err.message.split("\n")[0] });
    }
   
    this.setState({ loading: false, open: false})
    Router.pushRoute(`/lottery`);
    this.close();

  };

  draw = async event => {

    this.setState({ loadingDraw: true})
  


  try {
    const accounts = await web3.eth.getAccounts();
      await lottery.methods.draw().send({
        from: accounts[0],
        gasLimit: 1000000
      });
    }
   
  
  catch (err) {
    this.setState({ errorMessage: err.message.split("\n")[0] });
  }
 
  this.setState({ loadingDraw: false})
  Router.pushRoute(`/lottery`);
  
};

  render() {
    const { open, size } = this.state;

    return (
      <div>
        <br />

        <Grid centered columns={3}>
          <Grid.Column>
          <Image onClick={this.show('tiny')} src="../static/tickets.png" size="large" />
            <Modal size={size} open={open} onClose={this.close} centered style={{ size: "300px",marginTop: "350px", marginLeft: "900px", position:"center" }}
            
               
            
            >
            
              <Modal.Header>Enter number of Tickets</Modal.Header>
              <Modal.Content form >
                <Form onSubmit={this.onClick} error={!!this.state.errorMessage}>
                  <Form.Field centered>
                    <label>Enter Number of Tickets</label>
                   
                    <Input
                      label="Tickets"
                      labelPosition="right"
                      placeholder="Enter amount"
                      value={this.state.numOfTicks}
                      onChange={event =>
                        this.setState({ numOfTicks: event.target.value })
                      }
                    />
                  </Form.Field>
                  <Message
                    error
                    header="Oops!"
                    content={this.state.errorMessage}
                  />
                  <Button
                  fluid
                    loading={this.state.loading}
                    primary
                  >
                    {"Buy Tickets"}
                  </Button>
                  
                </Form>
                <br/>
                <Button
                   fluid
                    primary
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

export default BuyTicket;
