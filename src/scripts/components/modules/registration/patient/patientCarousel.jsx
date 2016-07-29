var React = require('react');
var moment = require('moment');
var RegistrationActions = require('../../../../actions/registrationActions');
var CarouselIndividual = require('./carouselIndividual');
var classNames = require('classnames');

module.exports = React.createClass({
  formatDisplay: function(){
    var patients = this.props.patients;
    if(this.props.patients.length > 2) {
      patients = patients.slice(0, 2);
    }
    return patients.map(function(patient, i){
      return (
        <div key={i} className="patient-individual-container">
          <CarouselIndividual patient={patient}
                              handleEdit={this.props.handleEdit}
                              editingPatient={this.props.editingPatient}
                              editingCount={this.props.editingCount}
                              handleCancel={this.props.handleCancel}
                              editPatientID={this.props.editPatientID}
                              />

        </div>
      )
    }.bind(this))
  },

  render: function(){
    var carouselClass = classNames({
      "mobile-only patient-carousel": true,
      "carousel-padding": this.props.editingPatient
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
