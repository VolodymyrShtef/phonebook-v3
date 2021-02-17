import React from "react";
import { Route, Switch } from "react-router-dom";

import ContactsList from "./phonebook/ContactsList";
import ShowFav from "./phonebook/ShowFav";
import AddContactForm from "./phonebook/AddContactForm";
import EditContactForm from "./phonebook/EditContactForm";

import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import "./styles.css";
import Logo from "../images/phone-book.svg";

export default function App() {
  return (
    <>
      <Container className="custom_wrapper">
        <Container className="flex_container">
          <img className="img_main" src={Logo} alt="" width="50" />
          <h2>Welcome to Phonebook App</h2>
        </Container>
      </Container>

      <Container fluid className="backgr_wrapper">
        <Container className="content_wrapper">
          <Switch>
            <Route exact path="/" component={ContactsList} />
            <Route path="/addnewcontact" component={AddContactForm} />
            <Route path="/editcontact" component={EditContactForm} />
            <Route path="/showfavourites" component={ShowFav} />
          </Switch>
        </Container>
      </Container>
    </>
  );
}
