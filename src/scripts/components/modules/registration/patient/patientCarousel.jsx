var React = require('react');
var moment = require('moment');
var RegistrationActions = require('../../../../actions/registrationActions');
var CarouselIndividual = require('./carouselIndividual');

module.exports = React.createClass({
  formatDisplay: function(patients){
    return this.props.patients.map(function(patient, i){
      return (
        <div key={i}>
          <CarouselIndividual patient={patient}/>
        </div>
      )
    })
  },

  render: function(){
    return(
      <div className="mobile-only patient-carousel">
        {this.formatDisplay()}
      </div>
    )
  }
});
