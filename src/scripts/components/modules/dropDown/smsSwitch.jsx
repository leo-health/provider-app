var React = require('react'),
    Reflux = require('reflux');

module.exports = React.createClass({
  //getInitialState: function(){
  //
  //  return { isSms: this.props.isSms, header: '', body: '' }
  //},


  render: function(){
    return(
      <li className="dropdown">
        <a className="dropdown-toggle navbar-dropdown" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
          <i className="fa fa-circle fa-2" aria-hidden="true" style={this.props.buttonColor}></i>
        </a>
        <ul className="dropdown-menu row">
          <li className="col-lg-12"><h5>Your are online and the practice is open</h5></li>
          <li className="col-lg-offset-1 col-lg-10"><h7>Away from your desk? Get Alerts on your phone</h7></li>
          <li className="col-lg-offset-2 col-lg-8"><button className="full-width-button">Turn On</button></li>
        </ul>
      </li>
    )
  }
});
