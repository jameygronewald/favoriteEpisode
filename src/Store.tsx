import React, { createContext, useReducer } from "react";

import { StateProps, ActionProps } from "./interfaces";

const initialState: StateProps = {
  episodes: [],
  favorites: [],
};

export const Store = createContext<StateProps | any>(initialState);

const reducer = (state: StateProps, action: ActionProps): StateProps => {
  switch (action.type) {
    case "FETCH_DATA":
      return { ...state, episodes: action.payload };
    case "ADD_FAV":
      return { ...state, favorites: [...state.favorites, action.payload] };
    case "REMOVE_FAV":
      return {...state, favorites: action.payload}
    default:
      return state;
  }
};

export const StoreProvider = (props: any): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Store.Provider value={{ state, dispatch }}>
      {props.children}
    </Store.Provider>
  );
};
