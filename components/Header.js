import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "../routes";

export default () => {
  return (
    <Menu
      widths="4"
      
      size="massive"
      style={{ marginTop: "30px", marginBottom: "20px" }}
    >
      <Menu.Item position="right">
      <Link route="/">
        <a className="item">CryptoCasino</a>
      </Link>
      </Menu.Item>

      <Menu.Item position="right">
        <Link route="/blackjack">
          <a className="item">Blackjack</a>
        </Link>
      </Menu.Item>

      <Menu.Item position="right">
        <Link route="/dice">
          <a className="item">Dice</a>
        </Link>
      </Menu.Item>

      <Menu.Item position="right">
        <Link route="/lottery">
          <a className="item">Lottery</a>
        </Link>
      </Menu.Item>  
    </Menu>
  );
};
