import React from "react";
import { Image, Grid, Reveal } from "semantic-ui-react";

const CoinImage = () => (
  <div>
    <Grid centered columns={3}>
            <Grid.Column>
              <Image
              rounded
                src="../static/cointoss.png"
                size="large"
                href="http://localhost:3000"
              />
            </Grid.Column>
          </Grid>
  </div>
);

export default CoinImage;
