# bruinchomp

## Description
Bruinchomp is a social media platform that allows users to post images and reviews of UCLA Dining hall food.

## Backend
`cd` into `bruinchomp/backend`
### Dependencies
`pip install -r requirements.txt`


### Usage
- Rename `bruinchomp/backend/.env.template` to `.env` and populate with Cloudinary API credentials and PostgreSQL database URI
- `flask --app app run` for development
- `gunicorn app:app` for production

## Frontend
`cd` into `bruinchomp/frontend`

### Usage
- Change the `proxy_server` variable in `constants.js` to whatever website is hosting your server (default is our server)
- In the project directory, you can run:

#### `npm install`
- Installs required packages

#### `npm start`
- Runs the app in the development mode.
- Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

#### `npm test`
- Launches the test runner in the interactive watch mode.

#### `npm run build`
- Builds the app for production to the `build` folder.
- It correctly bundles React in production mode and optimizes the build for the best performance.

## Contributors

#### [Andrew Wang](https://github.com/strawhqt)
#### [Jerry Yao]
#### [Andrew Zhang]
#### [Jason Zhang]
#### [Zakary Zimmerman]