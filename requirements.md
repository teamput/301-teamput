# Software requirements 

## Vision: 
Our vision is to create an app that helps a user find things to do when bored. Based on user input regarding their location, interests, and whether they are hungry, the app suggests events and restaurants relevant to the user and their current location.

## Scope: 
Our product will provide information to the user about different events, restaurants, and volunteer opportunities near their location. The app will provide the opportunity for the user to indicate what their main interest is and will suggest events closest to that interest. The user will have the opportunity to enter new information and generate new results, or to view results based on the previous entry.
Our product will not have the ability to let users star or favorite events or restaurants.

## MVP: 
Our MVP will contain functionality to make API calls to Google geocode to obtain a latitude and longitude for the user-entered location. MVP will contain a questionnaire that takes in the user's top interest, and makes an API call to Eventful to return results based on that. MVP also makes an API call to Yelp for restaurants in the area and returns those results if the user has indicated they are hungry. And finally, MVP suggests volunteer opportunties in the area if the user has indicated they are interested in volunteering.

## Stretch goals: 
Stretch goals include:
* Incorporating weather APIs to inform user about current weather
* Incorporating news APIs to display current news stories relevant to the area
* Allowing the user to select several areas of interest and return results based on all of them
* Incorporate login for multiple users

## Functional requirements: 
A user can update their quiz responses/preferences to obtain different results.
A user can view current, up-to-date results based on the search info they previously entered

### Data Flow:
A user navigates to the home page, and if they have completed the quiz before (ie, if there is info in the database), they have the option to either take the quiz anew, or to view updated results based on their previous answers. 
The quiz page, if shown, asks the user to input their location, hunger level, and primary interest, and uses that info to make API calls.
The results page displays the results from those API calls, formatted for readability. The user also has the ability to delete their quiz results from the database entirely.

## Non-Functional requirements: 
* Usability: In the interest of creating better usability, our app will prompt the user only a limited number of times to avoid having to enter excessive information. The user will be able to select from pre-loaded list of options to avoid having to free text their responses. The results will be displayed, grouped by their type (eg, restaurants, events, etc) for better readability.
* Security: (A stretch goal) In order to allow better security and to keep users' login and preferences/quiz results separate, we would like to incorporate a unique login system using BeCrypt.