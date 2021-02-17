import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";

import { connect } from "react-redux";
import phbActions from "../../redux/phonebook/phbActions";

function ContactsList({ contacts, onDeleteItem, onChangeEditID, onToogleFav }) {
  const addToFavToggle = (e) => {
    const idFavToggle = e.target.id;
    const updatedContacts = contacts.map((contact) =>
      contact.id === idFavToggle
        ? {
            ...contact,
            favourite: !contact.favourite,
          }
        : { ...contact }
    );
    onToogleFav(updatedContacts);
  };

  const markup = contacts.map((contact) => (
    <TableItem
      key={contact.id}
      item={contact}
      onDeleteItem={onDeleteItem}
      onChangeEditID={onChangeEditID}
      onAddToFavToggle={addToFavToggle}
    />
  ));

  function TableItem({ item, onDeleteItem, onChangeEditID, onAddToFavToggle }) {
    const { name, phone, email, favourite } = item;
    return (
      <tr>
        <td className="general_table">{name}</td>
        <td className="general_table">{phone}</td>
        <td className="general_table">{email}</td>
        <td>
          <Container className="flex_container_spased">
            <Button
              variant={favourite ? "light" : "secondary"}
              className="manage_fav_button button_with_marginR"
              size="sm"
              type="button"
              onClick={onAddToFavToggle}
              id={item.id}
            >
              {favourite ? "Out of favourites" : "Add to favourites"}
            </Button>

            <Link to="/editcontact">
              <Button
                className="button_with_marginR button_with_marginL"
                variant="secondary"
                type="button"
                onClick={() => onChangeEditID(item.id)}
                id={item.id}
              >
                Edit
              </Button>
            </Link>

            <Button
              className="button_with_marginL"
              variant="secondary"
              type="button"
              onClick={() => onDeleteItem(item.id)}
              id={item.id}
            >
              Delete
            </Button>
          </Container>
        </td>
      </tr>
    );
  }

  return (
    <>
      <h2>Contacts List</h2>
      <Container className="flex_container_spased custom_wrapper">
        <Link to="/addnewcontact">
          <Button variant="primary" size="lg" className="button_with_marginR">
            Add new contact
          </Button>{" "}
        </Link>
        <Link to="/showfavourites">
          <Button variant="primary" size="lg" className="button_with_marginL">
            Show favourites
          </Button>{" "}
        </Link>
      </Container>

      <Table
        responsive
        striped
        bordered
        hover
        size="sm"
        variant="dark"
        className="general_table"
      >
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

const mapStateToProps = (state) => ({ contacts: state.contacts.items });
const mDTP = {
  onChangeEditID: phbActions.changeEditID,
  onDeleteItem: phbActions.deleteContact,
  onToogleFav: phbActions.toggleFav,
};

export default connect(mapStateToProps, mDTP)(ContactsList);
