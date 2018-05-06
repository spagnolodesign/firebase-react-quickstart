import React, { Component } from 'react';
import { connect } from 'react-redux';
import { meetupFetchData } from '../../actions/meetups/meetup';

import MeetUpMessages from './MeetUpMessages';

class MeetUpView extends Component {

    componentDidMount(){
      const id = this.props.match.params.id;
      this.props.loadData(id);
    }

    render() {
      if (this.props.hasErrored) {
        return <p>Sorry! There was an error loading the meetups</p>;
      }
      if (this.props.isLoading) {
        return (<div className="loader"></div>);
      }

      return (
        <div>
          <p>{new Date().toString()}</p>
          <p>{this.props.match.params.id}</p>
          <MeetUpMessages roomId={this.props.match.params.id} />
        </div>
      );
    }
}


const mapStateToProps = (state) => {
    return {
        meetup: state.meetup,
        hasErrored: state.meetupHasErrored,
        isLoading: state.meetupIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadData: (id) => dispatch(meetupFetchData(id)),
        sendMessage: (room, message) => dispatch(sendMessageToMeetup(room, message))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MeetUpView);
