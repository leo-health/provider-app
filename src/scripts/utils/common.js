var StringUtils = {};

StringUtils = {
  formatName: function(userNameObject) {
    var userName = (((userNameObject.title === null || 0 === userNameObject.title.length) ? "" : (userNameObject.title + " "))  + userNameObject.first_name + " " + userNameObject.last_name);
    if(userNameObject.credentials && userNameObject.credentials.length > 0){
      var credential = userNameObject.credentials[0];
      userName = userName + " " + credential
    }

    return userName
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
