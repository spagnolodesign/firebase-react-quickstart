import React, { Component } from 'react';
import { connect } from 'react-redux';

import { sendMessageToMeetup, meetupFetchMessagesData } from '../../actions/meetups/meetup';

class MeetUpMessages extends Component {
    constructor() {
      super();
      this.state = {
        text: ""
      };
    }

    componentDidMount = () => {
      this.props.loadMessages(this.props.roomId);
    }

    handleChange = (event) => {
      this.setState({ [event.target.id]: event.target.value });
    }

    handleSubmit = (event) => {
      event.preventDefault();
      const { text } = this.state;
      const id = this.props.roomId;

      if (!text || !id) return;
      this.props.sendMessage(id, { text });
      this.setState({ text: "" });
    }


    render() {
      const { text } = this.state;

      return (
        <div>
          {this.props.data.messages.map((message, i) => (
             <p key={i}>{message.text} - {message.timestamp.seconds}</p>
          ))}

          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">text</label>
              <input
                type="text"
                className="form-control"
                id="text"
                value={text}
                onChange={this.handleChange}
              />
            </div>
            <button type="submit" className="btn btn-success btn-lg">
              SAVE
            </button>
          </form>
        </div>
      );
    }
}


const mapStateToProps = (state) => {
    return {
      data: state.messages
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadMessages: (id) => dispatch(meetupFetchMessagesData(id)),
        sendMessage: (room, message) => dispatch(sendMessageToMeetup(room, message))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MeetUpMessages);
