import React, { Component } from "react";
import { Image, Grid, Reveal, Divider } from "semantic-ui-react";
import Layout from "../components/Layout";
import Options from "../components/indexOptions";
import web3 from "../ethereum/web3";
import Info from "../components/info";

class PageIndex extends Component {


  render() {
    return (
      <Layout>
        <div>
          <br/>
        <Divider />
          <Grid>
            <Grid.Row columns={1}>
              <Grid.Column>
                <Image centered src="../static/logo.png" size="massive" />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={1}>
              <Grid.Column>
              
                <Options />
                <br/>
                
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
    
        <Info/>
       
      </Layout>
    );
  }
}

export default PageIndex;
