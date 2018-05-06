import React, { Component } from 'react';
import { connect } from 'react-redux';
import { itemsFetchData } from '../actions/items';

class ItemList extends Component {
    constructor() {
        super();
    }
    componentDidMount() {
       this.props.fetchData("https://5aca183c7506e10014524818.mockapi.io/api/v1/items");
    }

    render() {
       if (this.props.hasErrored) {
           return <p>Sorry! There was an error loading the items</p>;
       }
       if (this.props.isLoading) {
           return <p>Loading…</p>;
       }
       return (
           <ul>
               {this.props.items.map((item) => (
                   <li key={item.id}>
                       <p>{item.name}</p>
                       <img src={item.imageUrl} />
                   </li>
               ))}
           </ul>
       );
    }
}


const mapStateToProps = (state) => {
    return {
        items: state.items,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(itemsFetchData(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
