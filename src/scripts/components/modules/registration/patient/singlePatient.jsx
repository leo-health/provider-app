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
      return <ShowPatient patient={this.props.patient} handleEdit={this.handleEdit}/>
    }else{
      return <EditPatient patient={this.props.patient} handleCancel={this.handleCancel} cancel={true}/>
    }
  },

  handleEdit: function(){
    this.setState({isEdit: false})
  },

  handleCancel: function(){
    this.setState({isEdit: true})
  },

  componentWillReceiveProps: function(nextProps){
    if(nextProps.patient) this.setState({isEdit: true})
  },

  render: function(){
    return(
      <div>
        {this.displayOrEdit()}
      </div>
    )
  }
});
