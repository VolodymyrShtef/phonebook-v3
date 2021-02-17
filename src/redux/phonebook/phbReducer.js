import { combineReducers } from "redux";
import actionsTypes from "./phbActions";
import { createReducer } from "@reduxjs/toolkit";

const items = createReducer([], {
  [actionsTypes.addContact]: (state, action) => [...state, action.payload],
  [actionsTypes.editContact]: (state, action) => action.payload,
  [actionsTypes.deleteContact]: (state, action) =>
    state.filter((contact) => contact.id !== action.payload),
  [actionsTypes.toggleFav]: (state, action) => action.payload,
});
const editID = createReducer("", {
  [actionsTypes.changeEditID]: (state, action) => action.payload,
});
export default combineReducers({ items, editID });
