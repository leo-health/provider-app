var React = require('react'),
    moment = require('moment');

module.exports = React.createClass({
  getInitialState: function(){
    if(this.props.value){
      return {
        month: this.props.value.format('MM'),
        day: this.props.value.format('DD'),
        year: this.props.value.format('YYYY')
      }
    }else{
      return {month: "month", day: "day", year: "year"}
    }
  },

  generateYears: function(){
    var years = [];
    var currentYear = parseInt(moment().format("YYYY"));
    for( var i = 0; currentYear - i > currentYear - 27; i++){
      years[i] = <option key={i} value={(currentYear - i).toString()}>{(currentYear - i).toString()}</option>
    }
    return years
  },

  generateDays: function(){
    var days = [];
    for( var i = 1; i < 32; i++){
      var day = ( i < 10 ? "0" + i.toString() : i.toString() );
      days[i-1] = <option key={i} value={day}>{day}</option>
    }
    return days
  },

  handleMonthChange: function (e){
    this.setState({ month: e.target.value }, function(){
      this.props.onChange(this.selectedDate())
    });
  },

  handleDayChange: function(e){
    this.setState({ day: e.target.value }, function(){
      this.props.onChange(this.selectedDate())
    });
  },

  handleYearChange: function(e){
    this.setState({ year: e.target.value }, function(){
      this.props.onChange(this.selectedDate())
    });
  },

  selectedDate: function () {
    if(this.state.month && this.state.month != 'month'
        && this.state.day && this.state.day != 'day'
        && this.state.year && this.state.year != 'year'){
      return moment(this.state.month + "-" + this.state.day + "-" + this.state.year, "MM-DD-YYYY");
    }else{
      return ''
    }
  },

  render: function(){
    return(
      <div className="row">
        <div className="col-lg-5 no-right-padding">
          <select className="form-control" value={this.state.month} onChange={this.handleMonthChange}>
            <option value="">Month</option>
            <option value="">-----</option>
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
        <div className="col-lg-3 no-right-padding tiny-left-padding">
          <select className="form-control" value={this.state.day} onChange={this.handleDayChange}>
            <option value="">Day</option>
            <option value="">-----</option>
            {this.generateDays()}
          </select>
        </div>
        <div className="col-lg-4 tiny-left-padding">
          <select className="form-control" value={this.state.year} onChange={this.handleYearChange}>
            <option value="">Year</option>
            <option value="">----</option>
            {this.generateYears()}
          </select>
        </div>
      </div>
    )
  }
});
