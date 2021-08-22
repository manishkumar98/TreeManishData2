import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import generateTree from "./generateTree";
import Node from "./containers/Node";
import { createStore } from "redux";
import reducer from "./reducers";
const tree = generateTree();
const store = createStore(reducer, tree);

store.subscribe(() => console.log(store.getState()));

render(
  <Provider store={store}>
    <Node id={0} />
  </Provider>,
  document.getElementById("root")
);
