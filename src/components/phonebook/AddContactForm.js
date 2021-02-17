import React, { Component } from "react";
import { Link } from "react-router-dom";
import ContactInputForm from "./ContactInputForm";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import { connect } from "react-redux";
import phbActions from "../../redux/phonebook/phbActions";

class AddContactForm extends Component {
  state = {
    name: "",
    phone: "",
    email: "",
  };

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
      this.props.contacts.find((contact) => contact.phone === this.state.phone)
    ) {
      alert("Contact with entered phone number already exists");
      return;
    }
    this.props.onAddContact(this.state);
    this.props.history.push("/");
  };

  render() {
    return (
      <>
        <Container className="flex_container">
          <h2 className="new_contact_title">New Contact</h2>
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
  contacts: state.contacts.items,
});
const mDTP = {
  onAddContact: phbActions.addContact,
};
export default connect(mapStateToProps, mDTP)(AddContactForm);
