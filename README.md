# Twitter Clone Debug Project

This is a demo clone of Twitter built as a learning exercise by one of our junior developers. Some features appear in the UI but are not functional. Functionality currently implemented:
- Log in
- Tweet
- Like an existing tweet

There are four bug reports below, fix as many reports as you can, with each fix in a separate commit, and supply the repository to Univers Labs.


## Setup

Clone this repo. Using Node.js v16 or greater, run `npm install` in both the `frontend` and `backend` directories.

Then start the respective services by running `npm start` in `frontend` and `backend` directories in separate terminal 
windows.

The backend API will run on `http://localhost:4000` and the front end app will run on `http://localhost:3000`. The `frontend` project includes hot reloading, however the `backend` project will need to be manually restarted for changes to take affect.

Test data is seeded into the SQLite database on startup in the `backend/knexDB.js` script. If you need to reset the database, delete the `backend/twitter.db` file and restart the `backend` with `npm start`

Test user accounts:

1:
- username: `raspberrybird`
- password: `password1`

2:
- username: `fishingcat`
- password: `password2`


## Bug Reports

- #1: In a fresh incognito window with no session cookie set, log in to an account. Tweets will not appear, only showing up after you've refreshed. Fix this so tweets appear after you've logged in, without having to refresh the page.

- #2: The `/trends` endpoint will sometimes return a `500` error code. Without modifying the `getIsTrending` service, fix the endpoint so that it still returns the `trends` (without the `trending` key) if the `getIsTrending` service throws an error.

- #3: Tweet timestamps aren't showing in relative local time, but relative to UTC time instead. Fix this so times are shown relative to the computer's timezone (e.g. BST, EST).

- #4: After posting a new tweet, the `/trends` endpoint is fetched twice in a row. You can see this happening in the Network Inspector tab of your browser debugger. Fix this so it only fetches once.
