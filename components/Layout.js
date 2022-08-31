import React from "react";
import Header from "./Header";
import { Container } from "semantic-ui-react";
import classes from "./Layout.module.css";
function Layout(props) {
  return (
    <Container className={classes.header}>
      <Header />
      {props.children}
    </Container>
  );
}

export default Layout;
