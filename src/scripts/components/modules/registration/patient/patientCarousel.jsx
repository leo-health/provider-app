var React = require('react');
var moment = require('moment');
var RegistrationActions = require('../../../../actions/registrationActions');
var CarouselIndividual = require('./carouselIndividual');
var classNames = require('classnames');

module.exports = React.createClass({
  getInitialState: function(){
    return {editing: 0}
  },

  formatDisplay: function(){
    var patients = this.props.patients;
    if(this.props.patients.length > 2) {
      console.log("Wow lots of patients");
      patients = patients.slice(0, 2);
    }
    return patients.map(function(patient, i){
      return (
        <div key={i} className="patient-individual-container">
          <CarouselIndividual patient={patient}
                              editingAdd={this.editingAdd}
                              editingCancel={this.editingCancel}
                              />
        </div>
      )
    }.bind(this))
  },

  editingAdd: function(){
    this.setState({editing: this.state.editing + 1})
  },

  editingCancel: function(){
    this.setState({editing: this.state.editing - 1})
  },

  render: function(){
    var carouselClass = classNames({
      "mobile-only patient-carousel": true,
      "carousel-padding": this.state.editing > 0
    });

    var leftArrow, rightArrow;
    if(this.props.patients.length > 2){
      leftArrow = <span className="pull-left glyphicon glyphicon-menu-left cursor carousel-arrow" onClick={this.props.carouselShiftLeft}></span>;
      rightArrow = <span className="pull-right glyphicon glyphicon-menu-right cursor carousel-arrow" onClick={this.props.carouselShiftRight}></span>;
    }
    return(
      <div className={carouselClass}>
        {leftArrow}
        {this.formatDisplay()}
        {rightArrow}
      </div>
    )
  }
});
