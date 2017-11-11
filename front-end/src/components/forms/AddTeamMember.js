import React from "react";
import { connect } from "react-redux";
import { Form, FormGroup, FormControl, ControlLabel, Button, Checkbox } from "react-bootstrap";
import FontAwesome from "react-fontawesome";
import SelectRole from "./SelectRole";
import SelectTeam from "./SelectTeam";
import AddSkills from "./AddSkills";

let teamMemberId = 100;

class AddTeamMember extends React.Component {
  constructor (props) {
    super(props);

    this.onInputChange = this.onInputChange.bind(this);
    this.onSkillsChange = this.onSkillsChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);

    this.state = {
      title: "Add Team Member",
      name: "",
      email: "",
      teamLead: false
    };
  }

  render () {
    return(
      <div className="row">
        <div className="col-md-8">
          <h3>{this.state.title}</h3>
          <Form>
            <ControlLabel>Name</ControlLabel>
            <FormGroup controlId="name">
              <FormControl
                type="text"
                name="name"
                placeholder="Enter your name"
                value={this.state.name}
                onChange={this.onInputChange}
              />
            </FormGroup>

            <ControlLabel>Email</ControlLabel>
            <FormGroup controlId="email">
              <FormControl
                type="email"
                name="email"
                placeholder="Enter your email"
                value={this.state.email}
                onChange={this.onInputChange}
              />
            </FormGroup>

            <FormGroup controlId="teamLead">
              <Checkbox
                name="teamLead"
                value={this.state.teamLead}
                onChange={this.onInputChange}
                inline>Team Lead
              </Checkbox>
            </FormGroup>

            <SelectTeam teams={this.props.teams} onSelect={(e) => {
              this.onInputChange(e);
            }} />
            
            <SelectRole roles={this.props.roles} onSelect={(e) => {
              this.onInputChange(e);
            }} />

            <AddSkills id="add-skills" onChange={this.onSkillsChange} />

            <Button type="submit" bsStyle="primary" onClick={this.onSubmitForm}>
              Add Team Member
            </Button>
            <Button type="reset" bsStyle="danger">Reset</Button>
          </Form>
        </div>
      </div>
    );
  }

  onInputChange (e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onSkillsChange (skills) {
    this.setState({
      skills
    });
  }

  onSubmitForm () {
    this.props.dispatch({
      type: "ADD_TEAM_MEMBER",
      teamMember: {
        "_id": `${teamMemberId++}teamMember`,
        "name": this.state.name,
        "email": this.state.email,
        "team": this.state.team,
        "teamHistory": ["ReactDojo", "AngularDojo"],
        "role": this.state.role,
        "skills": ["React", "Redux", "Angular"]
      }
    });
  
    this.props.dispatch({
      type: "CHANGE_ROUTE",
      route: ""
    });
  }
};

AddTeamMember = connect((state, ownProps) => {
  return {
    teams: state.teams,
    roles: state.roles
  };
})(AddTeamMember);

export default AddTeamMember;