import { v4 as uuidv4 } from "uuid";
import { createAction } from "@reduxjs/toolkit";

const addContact = createAction("contact/adding", ({ name, phone, email }) => ({
  payload: { id: uuidv4(), name, phone, email, favourite: false },
}));
const changeEditID = createAction("contact/changeEditID");
const editContact = createAction("contact/edit");
const deleteContact = createAction("contact/delete");
const toggleFav = createAction("contact/toggleFav");

export default {
  addContact,
  changeEditID,
  editContact,
  deleteContact,
  toggleFav,
};
