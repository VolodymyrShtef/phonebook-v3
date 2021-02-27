import React from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";

import { connect } from "react-redux";
import phbActions from "../../redux/phonebook/phbActions";

function ContactsList({
  contacts,
  onDeleteItem,
  onChangeEditID,
  onToogleFav,
  history,
}) {
  const markup = contacts.map((contact) => (
    <TableItem key={contact.id} item={contact} onDeleteItem={onDeleteItem} />
  ));

  function handleEditClick(editID) {
    onChangeEditID(editID);
    history.push("/editcontact");
  }
  function handleButtonsClick(goTo) {
    history.push(goTo);
  }

  function TableItem({ item, onDeleteItem, history }) {
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
              onClick={() => onToogleFav(item.id)}
              id={item.id}
            >
              {favourite ? "Out of favourites" : "Add to favourites"}
            </Button>

            <Button
              className="button_with_marginR button_with_marginL"
              variant="secondary"
              type="button"
              onClick={() => handleEditClick(item.id)}
              id={item.id}
            >
              Edit
            </Button>

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
        <Button
          onClick={() => handleButtonsClick("/addnewcontact")}
          variant="primary"
          size="lg"
          className="button_with_marginR"
        >
          Add new contact
        </Button>{" "}
        <Button
          onClick={() => handleButtonsClick("/showfavourites")}
          variant="primary"
          size="lg"
          className="button_with_marginL"
        >
          Show favourites
        </Button>{" "}
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
