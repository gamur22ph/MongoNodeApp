# MongoNodeApp

This is a simple node js app with mongodb and reactjs

for windows

## How to use

to install packages:

`npm install`

Initially database and register won't work so you will need to setup the following:

`touch .env` or create a ".env" file

inside the ".env" file you must add these things

`DB_CONNECTION = "mongodb://hostname:port/database"`
`JWTSECRET = "ANYSECRETKEY"`

to run:

`npm run start`