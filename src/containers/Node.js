import React from "react";
import { Component } from "react";
//import { State } from "../statty";
//import * as updaters from "../reducers";
import { connect } from "react-redux";
import * as actions from "../actions";
/*const NodeContainer = (props) => {
  return (
    <State
      select={(state) => state[props.id]}
      render={(state, update) => <Node {...state} update={update} />}
    />
  );
};*/

export class Node extends Component {
  handleIncrementClick = () => {
    const { increment, id } = this.props;
    //this.props.update(updaters.increment(id));
    increment(id);
  };

  handleAddChildClick = (e) => {
    e.preventDefault();

    const { addChild, createNode, id } = this.props;
    const childId = createNode().nodeId;
    //const childId = id + 100;
    addChild(id, childId);
  };

  handleRemoveClick = (e) => {
    e.preventDefault();

    const { removeChild, deleteNode, parentId, id } = this.props;
    removeChild(parentId, id);
    deleteNode(id);
  };

  renderChild = (childId) => {
    const { id } = this.props;
    return (
      <li key={childId}>
        <ConnectedNode id={childId} parentId={id} />
      </li>
    );
  };

  /* shouldComponentUpdate(nextProps, nextState) {
    return nextProps.counter !== this.props.counter;
  }*/

  render() {
    const { id, counter, parentId, childIds } = this.props;
    return (
      <div>
        <p>{id}</p>
        <p> Counter: {counter} </p>
        <button onClick={this.handleIncrementClick}>+</button>{" "}
        {typeof parentId !== "undefined" && (
          <button
            onClick={this.handleRemoveClick} // eslint-disable-line jsx-a11y/href-no-hash
            style={{ color: "lightgray", textDecoration: "none" }}
          >
            ×
          </button>
        )}
        <ul>
          {childIds.map(this.renderChild)}
          <li key="add">
            <button
              // href="#" // eslint-disable-line jsx-a11y/href-no-hash
              onClick={this.handleAddChildClick}
            >
              Add child
            </button>
          </li>
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return state[ownProps.id];
}

const ConnectedNode = connect(mapStateToProps, actions)(Node);
export default ConnectedNode;
