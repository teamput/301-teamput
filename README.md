# I'm Bored!
An app that suggests things for you to do when you've got nothing else to do.

## Group members
Vik Akam, Pete Alba, Laura Antonius, Isaac Nelson

## Database Entity Relationship Diagram
![Database ERD](database_erd_img/database_ERD.png)

## User Stories
* User story #1: As a bored person, I want my app to load quickly so that I can enjoy using the app
    * Feature Tasks: Create server, install npm packages, setup database, create views folder for templating with EJS, obtain API keys
* User story #2: As a bored person, I want to answer questions about my preferences so that my results are tailored toward me
    * Feature Tasks: Display a questionnaire of the quiz route that asks about user's hunger, location, and preferences, and using POST, collects that info and calls geocode API to determine latitude and longitude
* User story #3: As a bored person, I want to make sure my activities and results are based on my location.
    * Feature Tasks: Use both the user-input city and the results of the geocode API call to request API results from all other APIs
* User story #4: As a bored person, I want to see events based on my preferences so that I can go to those events
    * Feature Tasks: Via GET, make a call to Events API, using the location object returned from geocode. Make event objects for each event. Limit results to 10. Display on the result page via EJS.
* User story #5: As a bored person, I want to know about music recommendations or trivia so that I can be entertained
    * Feature Tasks: Via GET, make a call to a music and/or trivia API, using the user-input which has been stored in the database. Make  objects for each result item. Limit results to 10. Display on the result page via EJS.
* User story #6: As a bored person, I want to be able to start the quiz over again to get new results.
    * Feature Tasks: Upon clicking a button, delete old user info from the database, and be able to start the quiz over again and submit new info to get updated results.
* User story #7: As a bored person, I want to be able to update my old quiz answers to get new results.
    * Feature Tasks: Upon clicking a 'change answers' button, the user is taken to a quiz screen that displays their old answers and allows them to update those answers.Upon form submission, results are updated in the database.
* User story #8: As a bored person, I want to know what relevant restaurant options are so that I can eat my boredom away
    * Feature Tasks: Via GET on the result route, make a call to the restaurant API, using the user-input which has been stored in the database. Make  objects for each result item. Limit results to 10. Display on the result page via EJS.
* User story #9: As a bored person, I want to encounter error messages so that I know my app isn't working
    * Feature Tasks: For every request made to an API, make sure there is a .catch to account for API errors. When data is not available, make sure there is a placeholder ready to act as a substitue. Make sure that if a route is unavailable or misspelled, a 404 message is displayed. Ensure that if a server error occurs, a 500 error is displayed.
* User story #10: As a bored person, I want a clean looking UI so that using the app is pleasant.
    * Feature Tasks: Make sure CSS makes the app fun and interactive for users. Modularize CSS according to SMACSS guidelines. Make a hamburger menu for options to update/delete quiz answers. Include a fun 'About Us' section for our bios.

## Project Management
[Our project management board on Trello.](https://trello.com/b/M5eI52RL/im-bored-301-project)

## Wireframes
![frame1](wireframe-imgs/wire1.png)
![frame1](wireframe-imgs/wire3.png)
![frame1](wireframe-imgs/wire2.png)
