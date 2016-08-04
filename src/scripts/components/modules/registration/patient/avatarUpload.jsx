var React = require('react'),
    ReactDom = require('react-dom');

module.exports = React.createClass({
  handleFile: function(e) {
    console.log("hell yeah");
    var reader = new window.FileReader();
    var file = e.target.files[0];

    if (!file) return;

    reader.onload = function(img) {
      ReactDom.findDOMNode(this.refs.in).value = '';
      this.props.handleFileChange(img.target.result);
    }.bind(this);
    reader.readAsDataURL(file);
  },

  render: function() {
    return (
      <input ref="in" type="file" accept="image/*" onChange={this.handleFile} />
    );
  }
});
