import React from "react";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";

import { connect } from "react-redux";
// https://phonebookv3.netlify.app/
function ShowFav({ contacts }) {
  const markup = contacts.map((contact) => (
    <TableItem key={contact.id} item={contact} />
  ));

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
        <Link to="/addnewcontact">
          <Button variant="primary" size="lg" className="button_with_marginR">
            Add new contact
          </Button>
        </Link>
        <Link to="/">
          <Button variant="primary" size="lg" className="button_with_marginL">
            Show all
          </Button>
        </Link>
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
