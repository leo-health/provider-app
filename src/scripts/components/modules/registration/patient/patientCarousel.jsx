var React = require('react');
var moment = require('moment');
var RegistrationActions = require('../../../../actions/registrationActions');
var CarouselIndividual = require('./carouselIndividual');
var classNames = require('classnames');

module.exports = React.createClass({
  getInitialState: function(){
    return {editing: 0}
  },

  formatDisplay: function(patients){
    return this.props.patients.map(function(patient, i){
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

    return(
      <div className={carouselClass}>
        {this.formatDisplay()}
      </div>
    )
  }
});
