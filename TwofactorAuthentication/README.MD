This solution contains a client page "Login.html" and local node.js service

1) Install node https://nodejs.org/en/download/
2) Download the solution
3) Move to "TwofactorAuthentication" repository and Run npm install from the command line 
4) Register for "AUTHY" Api key and set value for "const API_KEY" in AccessService.js file
5) Run "npm start" in command line (This will start the service)
6) Open Login.html page in browser
    a) Register the valid values and valid Singapore mobile number
    b) login with login credentials
    c) Enter the token sent to your registere mobile number
    d)check whether it is verified