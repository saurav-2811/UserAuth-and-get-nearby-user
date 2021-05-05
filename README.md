<p align="left">
<h4 align="left">a backend API for user authentication,crud and near by user <h4>
</p>

--

[![DOCS](https://img.shields.io/badge/Documentation-see%20docs-green?style=for-the-badge&logo=appveyor)](https://documenter.getpostman.com/view/14176656/TzRNGVsC)


## Functionalities

-   [x] Users auth via web token
-   [x] able to get near by users of given email&name
-   [x] able to register
-   [x] able to login
-   [x] able to logout to clear token
-   [x] rotes are protected so you have to login to access routes
-   [x] able to update and delete user detail


<br>

## Technologies

-   MongoDb for data base
-   node as backend
-   express

## Instructions to run

-   Pre-requisites:

    -   Node.js
    -   NPM
    
    -   Directions to setup/install

```bash
$ git clonehttps://github.com/saurav-2811/UserAuth-and-get-nearby-user.git
$ cd UserAuth-and-get-nearby-user
$ touch .env
$ cp .env.example .env
# Set values in .env
$ npm i
```
-   Directions to execute

```bash
$ npm run dev
```

<br>    

    
