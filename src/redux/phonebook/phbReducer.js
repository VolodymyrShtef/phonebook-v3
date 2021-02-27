import actionsTypes from "./phbActions";
import { createReducer } from "@reduxjs/toolkit";

// поміняв редуцери
export default createReducer(
  { items: [], editID: "" },
  {
    [actionsTypes.addContact]: (state, action) => ({
      items: [...state.items, action.payload],
    }),

    // забрав логіку редагування з компонента і !добавив спреди)
    [actionsTypes.editContact]: (state, action) => ({
      items: state.items.map((contact) =>
        contact.id === state.editID
          ? {
              ...contact,
              ...action.payload,
            }
          : { ...contact }
      ),
    }),

    [actionsTypes.deleteContact]: (state, action) => ({
      items: state.items.filter((contact) => contact.id !== action.payload),
    }),

    // логіку тогла обраних теж забрав у редуцер
    [actionsTypes.toggleFav]: (state, action) => ({
      items: state.items.map((contact) =>
        contact.id === action.payload
          ? {
              ...contact,
              favourite: !contact.favourite,
            }
          : { ...contact }
      ),
    }),

    [actionsTypes.changeEditID]: (state, action) => ({
      ...state,
      editID: action.payload,
    }),
  }
);
