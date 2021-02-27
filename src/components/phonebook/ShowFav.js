import React from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";

import { connect } from "react-redux";

function ShowFav({ contacts, history }) {
  const markup = contacts.map((contact) => (
    <TableItem key={contact.id} item={contact} />
  ));

  function handleButtonsClick(goTo) {
    history.push(goTo);
  }

  function TableItem({ item }) {
    const { name, phone, email } = item;
    return (
      <tr>
        <td>{name}</td>
        <td>{phone}</td>
        <td>{email}</td>
      </tr>
    );
  }

  return (
    <>
      <h2>Favourite Contacts</h2>
      <Container className="flex_container_spased custom_wrapper">
        <Button
          onClick={() => handleButtonsClick("/addnewcontact")}
          variant="primary"
          size="lg"
        >
          Add new contact
        </Button>

        <Button
          onClick={() => handleButtonsClick("/")}
          variant="primary"
          size="lg"
        >
          Show all
        </Button>
      </Container>

      <Table responsive striped bordered hover size="sm" variant="dark">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>{markup}</tbody>
      </Table>
    </>
  );
}

const mapStateToProps = (state) => {
  const favContacts = state.contacts.items.filter(
    (contact) => contact.favourite
  );
  return { contacts: favContacts };
};

export default connect(mapStateToProps)(ShowFav);
