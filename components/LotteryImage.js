import React from "react";
import { Image, Grid, Reveal } from "semantic-ui-react";

const LotteryImage = () => (
  <div>
    <Grid centered columns={3}>
      <Grid.Column>
        <Image
        rounded
          src="../static/lottery.png"
          size="large"
          href="http://localhost:3000"
        />
      </Grid.Column>
    </Grid>
  </div>
);

export default LotteryImage;
