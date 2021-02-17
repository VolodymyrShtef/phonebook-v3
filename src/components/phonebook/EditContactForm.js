import React, { Component } from "react";
import { Link } from "react-router-dom";
import ContactInputForm from "./ContactInputForm";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import { connect } from "react-redux";
import phbActions from "../../redux/phonebook/phbActions";

class EditContactForm extends Component {
  state = {
    name: "",
    phone: "",
    email: "",
  };
  componentDidMount() {
    if (!this.props.editID) {
      this.props.history.push("/");
      return;
    }

    const editingContact = this.props.contacts.find(
      (contact) => contact.id === this.props.editID
    );
    const { name, phone, email } = editingContact;
    this.setState({
      name: name,
      phone: phone,
      email: email,
    });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.name || !this.state.phone) {
      alert("Fields with * required");
      return;
    }
    if (
      this.props.contacts.find(
        (contact) =>
          contact.phone === this.state.phone && contact.id !== this.props.editID
      )
    ) {
      alert("Contact with entered phone number already exists");
      return;
    }

    const updatedContacts = this.props.contacts.map((contact) =>
      contact.id === this.props.editID
        ? {
            name: this.state.name,
            phone: this.state.phone,
            email: this.state.email,
            id: contact.id,
            favourite: contact.favourite,
          }
        : { ...contact }
    );
    this.props.onAcceptChanges(updatedContacts);
    this.props.resetEditID("");
    this.props.history.push("/");
  };

  render() {
    return (
      <>
        <Container className="flex_container">
          <h2 className="new_contact_title">Edit Contact</h2>
          <Link to="/" className="back_button">
            <Button variant="outline-primary" type="button">
              Back
            </Button>
          </Link>
        </Container>

        <ContactInputForm
          state={this.state}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  editID: state.contacts.editID,
  contacts: state.contacts.items,
});
const mDTP = {
  onAcceptChanges: phbActions.editContact,
  resetEditID: phbActions.changeEditID,
};
export default connect(mapStateToProps, mDTP)(EditContactForm);
