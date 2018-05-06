import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from "react-router-dom";

import { meetupsFetchData } from '../../actions/meetups/meetups';
import MeetUpCard from './MeetUpCard';
import MeetUpForm from './MeetUpForm';

class MeetUpListing extends Component {

    componentDidMount() {
       this.props.loadData("https://5aca183c7506e10014524818.mockapi.io/api/v1/meetups");
    }

    render() {
       if (this.props.hasErrored) {
           return <p>Sorry! There was an error loading the meetups</p>;
       }
       if (this.props.isLoading) {
           return (<div className="loader"></div>);
       }
       return (
         <div className="row">
          <div className="col-sm">
             {this.props.meetups.map((meetup, i) => (
                <MeetUpCard key={i} name={meetup.name} id={meetup.id} />
             ))}
          </div>
          <div className="col-sm">
            <MeetUpForm />
          </div>
         </div>
       );
    }
}


const mapStateToProps = (state) => {
    return {
        meetups: state.meetups,
        hasErrored: state.meetupsHasErrored,
        isLoading: state.meetupsIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadData: (url) => dispatch(meetupsFetchData(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MeetUpListing);
