# servicenow-dev-bot

# Prerequisites
In the project folder, run the following commands:

```
npm i puppeteer

npm install

npm init

npm install dotenv
```

You need to have nodejs installed on your machine, since puppeteer is based on it. Please check https://nodejs.org/en/

## Personal Info .env
The .env file will store your personal information (instance name, user, email, password).
Create a a file .env and paste the following:
```
USER_NAME=exampleuser
PASSWORD=examplepassword

USEREMAIL=exampleemail
EMAILPW=exampleemailpassword


DEVINST=exampledevnumber
```

**USER_NAME** and **PASSWORD** is the user to login on your dev instance.\
**USEREMAIL** and **EMAILPW** is to login on your servicenow account (to wake it up)\
**DEVINST** is only the code of your instance. Example: dev85752 (don't fill with the rest of the URL) 

## 
After that, run **node index.js** to run your application, if any errors or issue is found running this command, check in package.json has  "main": "index.js"

