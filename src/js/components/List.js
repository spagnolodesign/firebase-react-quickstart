import React, { Component } from "react";
import { connect } from "react-redux";
import { removeArticle, likeArticle } from "../actions/index";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


const mapDispatchToProps = dispatch => {
  return {
    removeArticle: id => dispatch(removeArticle(id)),
    likeArticle: id => dispatch(likeArticle(id))
  };
};

const mapStateToProps = state => {
  return { articles: state.articles };
};


class List extends Component {

  handleDelete = (id) => {
    this.props.removeArticle(id);
  }

  handleAddlike = (id) => {
    this.props.likeArticle(id);
  }

  render(){
    return(
      <ul className="list-group list-group-flush">
        {this.props.articles.map(el => (
          <li className="list-group-item" key={el.id}>
            {el.title}, {el.likes}
            <button onClick={() => this.handleDelete(el.id)}>X</button>
            <button onClick={() => this.handleAddlike(el.id)}>Like</button>
          </li>
        ))}
      </ul>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
