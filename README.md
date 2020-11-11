# MongoNodeApp

This is a simple node js app with mongodb and reactjs

for windows you will need mongodb to utilize
[MongoDB](https://docs.mongodb.com/manual/installation/)

## How to use

### Server Side

to install packages:

`npm install`

Initially database and register won't work so you will need to setup the following:

`touch .env` or create a ".env" file

inside the ".env" file you must add these things

`DB_CONNECTION = "mongodb://anyhostname:portUsed/database"`
`JWTSECRET = "ANYSECRETKEY"`

to run the server side:

`npm run start`

### Client Side

`cd client`

to install packages:

`npm install`

to run:

`npm start`

## If you want to run the static build

`cd client`
`npm install`
`npm run build`

Uncomment the code inside server.js below client route

`npm run start`

All done.

