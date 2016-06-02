var React = require('react'),
    Reflux = require('reflux'),
    RegistrationStore = require('../../../stores/registrationStore'),
    classNames = require('classnames'),
    moment = require('moment'),
    ErrorAlert = require('../alert/errorAlert'),
    EditPatient = require('./patient/editPatient'),
    SinglePatient = require('./patient/singlePatient');

module.exports = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },

  getInitialState: function(){
    return { edit: false, cancel: false, status: '', message: '' }
  },

  componentWillReceiveProps: function(nextProps){
    if(nextProps.patients.length > 0) this.setState({ edit: false, status: '' })
  },

  showPatients: function(){
    return this.props.patients.map(function(patient, i){
      return <SinglePatient key={i} patient={patient}/>;
    });
  },

  addPatient: function(){
    if(this.props.patients.length > 0 && !this.state.edit){
      return React.createElement('a',  {className: "col-md-1 col-md-offset-11", onClick: this.switchToEdit}, 'add')
    }else{
      return <EditPatient cancel={this.state.cancel} handleCancel={this.handleCancel}/>
    }
  },

  handleCancel: function(){
    this.setState({edit: false, cancel: false})
  },

  switchToEdit: function(){
    this.setState({edit: true, cancel: true})
  },

  handleContinue: function(){
    if(this.props.patients.length > 0){
      this.props.navigateTo('payment')
    }else{
      this.setState({message: "At least one child is required!", status: "error"})
    }
  },

  render: function(){
    var continueButtonClass = classNames({
      "btn btn-primary full-width-button": this.props.patients.length > 0,
      "btn btn-primary full-width-button disabled": this.props.patients < 1
    });

    return(
      <div>
        <div className="col-lg-11 col-lg-offset-1">
          <h4 className="signup-header">Let's set up a profile for each of your children</h4>
          <p className="lead">Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
        </div>
        <div className="inline-hr"></div>
        <div className="row">
          <div className="col-lg-10 col-lg-offset-1">
            <ErrorAlert message={this.state.message}
                        status={this.state.status}/>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-lg-offset-1">
            {this.showPatients()}
            {this.addPatient()}
          </div>
          <div className="col-lg-4">
            <button type="button"
                    onClick={this.handleContinue}
                    className={continueButtonClass}>
              Continue
            </button>
            <br />
            <br />
            <div id="accordion" role="tablist" aria-multiselectable="true" hide="false" className="panel panel-body">
              <div className="">
                <div className="panel-heading" role="tab" id="headingOne">
                  <h4 className="panel-title">
                    <strong><a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                      This is the first sample FAQ topic.
                    </a></strong>
                  </h4>
                </div>
                <div id="collapseOne" className="collapse panel-body" role="tabpanel" aria-labelledby="headingOne">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                </div>
              </div>
              <div className="">
                <div className="panel-heading" role="tab" id="headingTwo">
                  <h4 className="panel-title">
                    <strong><a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                      This is the second sample FAQ topic.
                    </a></strong>
                  </h4>
                </div>
                <div id="collapseTwo" className="collapse panel-body" role="tabpanel" aria-labelledby="headingTwo">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                </div>
              </div>
              <div className="">
                <div className="panel-heading" role="tab" id="headingThree">
                  <h4 className="panel-title">
                    <strong><a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                      This is the third sample FAQ topic.
                    </a></strong>
                  </h4>
                </div>
                <div id="collapseThree" className="collapse panel-body" role="tabpanel" aria-labelledby="headingThree">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});
