import React, { Component } from "react";
import { connect } from "react-redux";
import TeamForm from "./TeamForm";
import { createTeam } from "../../actions/teams";

class AddTeam extends Component {
  constructor (props) {
    super(props);
  }

  onSubmit = team => {
    this.props.onSubmit(team);
    this.props.history.push('/');
  }

  render() {
    return (
      <TeamForm
        title="Add Team"
        onSubmit={this.onSubmit} 
      />
    )
  }
}


const mapDispatchToProps = (dispatch) => ({
  onSubmit: (team) => dispatch(createTeam(team))
})

export default connect(undefined, mapDispatchToProps)(AddTeam);