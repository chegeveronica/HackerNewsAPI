# HackerNewsAPI
This is an app that talks to a public HackerNewsAPI. On the following page, you’ll find the documentation: https://github.com/HackerNews/API
The app has three endpoints:
1. Top 10 most occurring words in the titles of the last 25 stories
2. Top 10 most occurring words in the titles of the post of exactly the last week
3. Top 10 most occurring words in titles of the last 600 stories of users with at least 10.000 karma

### Languages and Frameworks
This task was completed using Typescript on NestJs Framework.


## Prerequisites
Ensure Node.js and npm (or yarn) are installed on your system. You can check the versions by running node -v and npm -v (or yarn -v) in your terminal. Download and install them from the official websites if not already present:
Node.js: https://nodejs.org/en
npm: Comes bundled with Node.js installation
yarn (alternative to npm): https://classic.yarnpkg.com/lang/en/docs/install/

## Cloning the Repository
		git clone https://github.com/chegeveronica/HackerNewsAPI.git

## Installing Dependencies
-  Navigate to the cloned project directory:

		cd hackernews
-  Install the project dependencies using npm or yarn:

		npm install
This will download and install all the necessary libraries required by your NestJS project.

## Run the Development Server
-  Start the NestJS development server to run your application:

		npm run start:dev
This will typically start the server on port 3000 by default. 

## Accessing the Application
Open an API application such as Postman and navigate to http://localhost:3000 (or the port specified in your configuration). You can easily access either of the three endpoints from there.




