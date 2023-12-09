# bruinchomp

## Description
Bruinchomp is a social media platform that allows users to post images and reviews of UCLA Dining hall food.

- First run `git clone https://github.com/ghtjason/bruinchomp.git`
- We have an API running at `https://api-m46o.onrender.com/`. To host your own, follow the steps in `Backend`. Otherwise skip to the `Frontend` section.

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
- Change the `proxy_server` variable in `constants.js` to the website hosting your server (default is our server)
- In the project directory, you run:

#### `npm install`
- Installs required packages

#### `npm start`
- Runs the app in the development mode.
- Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Contributors

#### [Andrew Wang](https://github.com/strawhqt)
#### [Jerry Yao](https://github.com/frozenhamburgers)
#### [Andrew Zhang](https://github.com/bobsparrow)
#### [Jason Zhang](https://github.com/ghtjason)
#### [Zakary Zimmerman](https://github.com/zakz22)