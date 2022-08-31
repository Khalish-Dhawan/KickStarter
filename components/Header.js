import React from "react";
import { Menu } from "semantic-ui-react";
import Link from "next/link";

function Header() {
  return (
    <Menu>
      <Menu.Item header>
        <Link href="/">KickStarter</Link>
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>
          <Link href="/">Campaigns</Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/campaigns/new">+</Link>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}

export default Header;
