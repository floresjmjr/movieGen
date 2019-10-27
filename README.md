# Movie Recommender App

## Background
This application allows a user to see what movies are trending, popular and highly rated. The user can search for movies and seek recommendations based on that search so that they can be added to the watchlist.

## Technologies Used
### Front-End
* HTML
* CSS
* JavaScript
* jQuery
* Handlebars

### Back-end
* Pug
* Node
* Express

### Database
* Postgresql
* Sequelize (ORM)

### Deployment
* Heroku

## Phases
### First Phase
* Use the movie database api to show off several movie categories (trending, popular, high-rated) (DONE)
* Allow for browsing listed movies while offering a summary when hovered. (DONE)
* Provide detailed information for movies chosen. (DONE)
* Use the api to search for matching movies based on text input (DONE)
* Recommend movies for each movie listed in the search results (DONE)
* Create a watchlist that can add and remove movies that were recommended. (DONE)
* Filter movies in watchlist based on genre (DONE)

### Second Phase
* Redeploy the website using AWS Beanstalk. (IN PROGRESS)
* Switch from using Heroku's postgresql database to use AWS postgresql database. (IN PROGRESS)
* Allow the user to create tags for the movies that are in the watchlist so they can filter based on tags. (PENDING)
* Allow the user to be able to rate the movies. (PENDING)

### Third Phase
* Add authentication using Node or AWS Cognito and AWS Amplify. (PENDING)

