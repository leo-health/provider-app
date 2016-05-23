var React = require('react'),
    RegistrationActions = require('../../../../actions/registrationActions'),
    EditPatient = require('./editPatient'),
    ShowPatient = require('./showPatient');

module.exports = React.createClass({
  getInitialState: function(){
    return {isEdit: !!this.props.patient}
  },

  displayOrEdit: function(){
    if(this.state.isEdit){
      this.editOrSave = "E";
      this.deleteOrCancel = "D";
      return <ShowPatient patient={this.props.patient}/>
    }else{
      this.editOrSave = "S";
      this.deleteOrCancel =" C";
      return <EditPatient ref="editPatientForm" patient={this.props.patient}/>
    }
  },

  componentWillReceiveProps: function(nextProps){
    if(nextProps.patient)this.setState({isEdit: true})
  },

  handleEditOrAdd: function(){
    if(this.state.isEdit) {
      this.setState({isEdit: false})
    }else{
      this.refs.editPatientForm.refs.component.handleOnSubmit();
    }
  },

  handleDeletOrCancel: function(){
    if(this.state.isEdit){
      RegistrationActions.removePatientEnrollmentRequest({
        id: this.props.patient.id,
        authentication_token: sessionStorage.enrollmentToken
      })
    }else{
      this.setState({isEdit: true})
    }
  },

  render: function(){
    return(
      <div className="row">
        <div className="form-group col-md-11">
          {this.displayOrEdit()}
        </div>

        <div className="form-group col-md-1">
          <a href="#" onClick={this.handleEditOrAdd}>{this.editOrSave}</a>
          <a href="#" onClick={this.handleDeletOrCancel}>{this.deleteOrCancel}</a>
        </div>
      </div>
    )
  }
});
