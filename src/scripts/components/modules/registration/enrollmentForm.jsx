var React = require('react');
var validation = require('react-validation-mixin');
var Joi = require('joi');
var strategy = require('joi-validation-strategy');

module.exports = React.createClass({
  render: function(){
    return(
      <div>
        <form onSubmit={this.props.handleOnSubmit}>
          <div className="body">
            <div className="row">
              <div className="col-md-7 col-md-offset-1">
                <h3 className="signup-header">Let's get started</h3>
              </div>
            </div>

            <div className="row">
              <div className="col-md-7 col-md-offset-1">
                <div className="row">
                  <div className="form-group col-sm-12">
                    <input type="text" className="form-control" id="inputEmail" placeholder="Email" ref="email" onChange={this.props.onChange('email')}/>
                  </div>
                </div>

                <div className="row">
                  <div className="form-group col-sm-12">
                    <input type="password" className="form-control" id="inputPassword" placeholder="Password" ref="password" onChange={this.props.onChange('password')}/>
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group">
                  <button type="submit" id="signup_continue" className="btn btn-primary">Continue</button>&nbsp;
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
});
