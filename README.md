# bruinchomp
## Backend
### Dependencies
`pip install Flask`
`pip install --upgrade firebase-admin`
`pip install cloudinary`
`pip install python-dotenv`


### Usage
- Create a 'posts' Collection in Cloud Firestore
- Save your Google Firebase key as `key.json` and move it into `bruinchomp/backend`
- Rename `bruinchomp/backend/.env.template` to `.env` and populate with Cloudinary API credentials
- Start the backend server with `flask --app server run`