import React, { Component } from 'react';
import { connect } from "react-redux";
import { addMeetUp } from "../../actions/meetups/meetups";

class MeetUpForm extends Component {
    constructor() {
      super();
      this.state = {
        name: ""
      };
    }

    handleChange = (event) => {
      this.setState({ [event.target.id]: event.target.value });
    }

    handleSubmit = (event) => {
      event.preventDefault();
      const { name } = this.state;
      if (!name) return;
      this.props.addMeetUp({ name });
      this.setState({ name: "" });
    }

    render() {
      const { name } = this.state;
      return (
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Title</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="btn btn-success btn-lg">
            SAVE
          </button>
        </form>
      );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addMeetUp: meetup => dispatch(addMeetUp(meetup))
    };
};

export default connect(null, mapDispatchToProps)(MeetUpForm);
