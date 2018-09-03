# Full-Stack-React-Redux

#### Documentation

* This is a full-stack react application that allows to signup as a new user, login and create things.
* Run ``` npm start  ``` in frontend & server folders in different terminal sessions. 
* User role based access control to allow to specific UI components or application content

## Configuration
Create a `.env` file and configure it with the following enviroment variables 
``` bash
PORT=3000 
MONGO_URI='<mongo uri>'
SECRET='<random string>'
```
## Running Mongo service 
* run `mongod` command in terminal session

## API Resources

#### User Model
The user model is used in the backend strickly for authentication and authorization. The user model will never be returned from the API, however server generated unique token is used for authorzation validation.  

#### Things
* Valid user will be able to see things provided by third party API.
* User who has admin access will be able to create new things and delete existing things
