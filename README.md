# Movie Recommender App

## Why
The idea came from my struggle with finding good movie recommendations. I didn't feel like the websites where the content was, generated good recommendations. I thought initially of creating my own algorithm that would generate recommendations based on a list of personally rated movies but after some research I discovered a cap in the amount of api calls one could make, making the algorithm not feesible.  The next best thing was to rely on the recommendations offered by the api.

## Background
This application allows a user to see what movies are trending, popular and highly rated. The user can search for movies and seek recommendations that can then be added to a watchlist.  The watchlist can be filtered based on the genre.

## Technologies Used
### Front-End
* HTML
* CSS
* JavaScript
* jQuery
* Handlebars - (needed a front-end templating language to more quickly respond to the user browsing through the movies on the front page.)  

### Back-end
* Pug
* Node
* Express

### Database
* Postgresql - (through Heroku)
* Sequelize (ORM)

### Deployment
* Heroku

## Phases
### First Phase
*Completed*
* Use the movie database api to show off several movie categories (trending, popular, high-rated)
* Allow for browsing listed movies while offering a summary when hovered.
* Provide detailed information for movies chosen.
* Use the api to search for matching movies based on text input
* Recommend movies for each movie listed in the search results
* Create a watchlist that can add and remove movies that were recommended
* Filter movies in watchlist based on genre

### Second Phase
*In Progress*
* Redeploy the website with AWS Beanstalk from Heroku
* Switch from using Heroku's postgresql database to use AWS postgresql database.

*Planned To Do*
* Allow the user to create tags for the movies that are in the watchlist so they can filter based on tags.
* Allow the user to be able to rate the movies.

### Third Phase
*Planned To Do*
* Add authentication using AWS Cognito and AWS Amplify.

