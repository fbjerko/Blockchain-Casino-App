import React from "react";
import { Image, Grid, Reveal } from "semantic-ui-react";
import Toss from "../components/Toss";

const ImageLinks = () => (
  <div>
    <Grid>
      <Grid.Row columns={2}>
      <Grid.Column>
      <Image
      floated="right"
          rounded
            src="../static/lottery.png"
            size="large"
            href="http://localhost:3000/lottery"
          />
        </Grid.Column>

        <Grid.Column>
          <Image
          rounded
            src="../static/blackjack.png"
            size="large"
            href="http://localhost:3000/blackjack"
          />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row columns={2}>
        <Grid.Column>
          <Image
            floated="right"
            src="../static/diceroll.png"
            size="large"
            href="http://localhost:3000/dice"
          />
        </Grid.Column>

        <Grid.Column>
         <Toss/>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
);

export default ImageLinks;
