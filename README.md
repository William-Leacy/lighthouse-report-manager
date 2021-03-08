# Lighthouse Report Manager

## Description
Simple crud application that saves Google Page Speed Insights reports under a project name. </br>
Utilizes Lighthouse npm module to generate the report. 

## Links
You can access the application here:
https://damp-temple-76255.herokuapp.com/projects

## Future Work
The project needs middleware for Delete routes so that when an object is deleted from its model, it is also deleted from the models that reference's it</br>

The project needs error handing on input files, especially when entering URL for that is used to generate a report.</br>

I would like to reference the user's model in projects so that a user can add other members to a project. With the current version, all users can see all projects.</br>

My original plan is to also dynamically add data from a collection of reports for urls to a d3.js  multi-line chart. This would give a visual look at the progress on a webpage.</br>



## Table of Contents
- [Description](#Description)
- [Links](#Links)
- [Install](#Install)
- [Features](#Features)
- [Built With](#Built-With])
- [Code organization](#Code-organization)
- [Design pattern used](#Design-pattern-used)
- [References](#Tests)
- [Tests](#Tests)
- [Design Documentation](#Design-Documentation)
    - [User Stories](#User-Stories)
    - [User Case](#User-Case)
- [Authors](#Author)
- [License](#License)

## Install
You can fork this repo and run from node. You will need to setup the .env variables.</br>

Dependencies</br>

npm packages
  - "bcryptjs": "^2.4.3",
  - "bootstrap-icons": "^1.4.0",
  - "dotenv": "^8.2.0",
  - "ejs": "^3.1.6",
  - "express": "^4.17.1",
  - "express-session": "^1.17.1",
  - "method-override": "^3.0.0",
  - "mongoose": "^5.11.18"
  - "chrome-launcher": "^0.13.4",
  - "lighthouse": "^7.2.0",

## Features 

## Built With
- mongodb
- node.js
- express.js
- JavaScript
- bootstrap
- Heroku
- mongo Atlas

## Code organization
The project trys to follow the coding style guide provied by [AirBnb](https://github.com/airbnb/javascript).

## Design pattern and System design approach
MVC is the design pattern for the project. The mongo models are using a mongoose reference Schema.</br>
A four-layer nested router was implemented for navigation throughout the project model to get to the reports.</br>

When generating a report the lighthouse npm package used chrome in a headless mode to use its lighthouse api.</br>
This report is then saved a a string variable and saved to the mongo database

bootstrap CSS framework was used to style the application </br>

## References
Side bar inspiration:</br>
Author: w3schools</br>
Date: March 4, 2021</br>
Type: source code</br>
publisher: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_sidenav_fixed</br>


Lightouse module: </br>
https://www.npmjs.com/package/lighthouse#using-the-node-module</br>

Langding page image:</br>
Author: unDraw</br>
Date: March 4, 2021</br>
Type: (raw)</br>
publisher: https://undraw.co/illustrations</br>


Nested controller code general design was inspired from this repo.</br>
Author: John A. Jacobs</br>
Date: March 4, 2021</br>
Type: (raw)</br>
Source: https://github.com/GopherEverett/RoastMe/blob/master/controllers/roastController.js/br>



## Tests

## Design Documentation 

### User Stories
- "As a project user, I want to create a project with many websites to report on"

- "As a project user, I want to see a list of websites on my project page."

- "As a project user, I want to see a list of webpages for each website."

- "As a project user, I want to see a list of reports for my webpage."

- "As a project user, I want to comment on a report"

- "As a project user, I want to add members to a project"

## Authors
William Leacy (Current Author).
## License

Apache License 2.0



