const http = require('http');
const https = require('https');
const port = 3000;


function getToken(reqBody,response) {
    var options = {
        host: "api.authy.com",
        port: '443',
        path: "/protected/json/phones/verification/start?",
        method: "POST",
        headers: {
            "X-Authy-API-Key":"1dF5EOyJBwwkzS945Njfm3r6ssGHUYZV",
            "Content-Type":"application/json"
        }
    };

    /**
     * Request for authentication and sending token
     */
    var authRequest = https.request(options, function (authResponse) {
        var responseString = "";

        authResponse.on('data', function (data) {
            responseString += data;
        });
        authResponse.on("end", function () {
            console.log(responseString); // print token response to console
            var resp = JSON.parse(responseString);
            console.log(resp);
            if(resp.success == true){                
                response.write("success");
                response.end();
            }
            else{                
                response.write(resp.message);
                response.end();
            }
            
        });
    });

    authRequest.write(reqBody);
    authRequest.end();
}

/**
 * Request for verification of token
 */
function verifyToken(reqBody,response) {
    console.log("code....");
    console.log(reqBody.code);
    var options = {
        host: "api.authy.com",
        port: '443',
        path: "/protected/json/phones/verification/check?phone_number="+reqBody.phone_number+"&country_code=65&verification_code="+reqBody.code,
        method: "GET",
        headers: {
            "X-Authy-API-Key":"1dF5EOyJBwwkzS945Njfm3r6ssGHUYZV",
        }
    };

    var verRequest = https.request(options, function (authResponse) {
        var responseString = "";

        authResponse.on('data', function (data) {
            responseString += data;
        });
        authResponse.on("end", function () {
            console.log(responseString); // print token response to console
            var resp = JSON.parse(responseString);
            if(resp.success == true){
                response.write("success");
                response.end();
            }
            else{
                response.write(resp.message);
                response.end();
            }
        });
    });
    
    verRequest.end();
}


const requestHandler = (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
  if(request.url.indexOf("requestToken")>0){
      var requestbody = "";
      request.on('readable',function(){
          var temp = request.read();
          if(temp !=null){          
            requestbody += temp;
          }
          
      });
      request.on('end',function(){
            var intReq = JSON.parse(requestbody);
            getToken(requestbody,response);

      });
      
  }
  else if (request.url.indexOf("verifyToken")>0){
      var requestbody = "";
      request.on('readable',function(){
          var temp = request.read();
          if(temp !=null){          
            requestbody += temp;
          }
          
      });
      request.on('end',function(){          
            var intReq = JSON.parse(requestbody);
            verifyToken(intReq,response);
      });
  }
  else{
      response.write('Hello Node.js Server started!')
      response.end();
  }
  


}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})