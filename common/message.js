const messageModule = (function(){
  
  var _requesMessage = function( requestMethod, requestUrl, requestBody ){
    let result = '';
    result = requestMethod != undefined ? result + 'Request Method: ' + requestMethod + ', ': result;
    result = requestUrl != undefined ? result + 'Request Url: ' + requestUrl + ', ': result;
    result = requestBody != undefined ? result + 'Request Body: ' + requestBody + ', ': result;
    console.log(result)
  }
  return {
    requesMessage: _requesMessage
  }
})();

module.exports = messageModule;