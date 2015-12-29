var StringUtils = {};

StringUtils = {
  formatName: function(userNameObject) {
    return ((userNameObject.title === null ? "" : (userNameObject.title + ". "))  + userNameObject.first_name + " " + userNameObject.last_name);
  },
  shorten: function(fullStr, len) {
    len = typeof len !== 'undefined' ?  len : 150;
    if(fullStr.length > len) {
      var shortStr = fullStr.substr(0, len);
      fullStr = shortStr.substr(0, shortStr.lastIndexOf(" ")) + "...";
    }

    return fullStr;
  }
};

module.exports.StringUtils = StringUtils;
