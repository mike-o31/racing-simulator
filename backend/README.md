Race Simulator
#API Overview
The back end has four different endpoints
/api/racers provides information on each racer
/api/race/start will begin a new race and open up a persistent connect so server sent events can be pushed
/api/winners will provide the winner for each race
#Installation
$ npm install
Or

$ yarn install
#Running the server (on port 3000)

# development

$ npm run start

# watch mode

$ npm run start:dev

# production mode

$ npm run start:prod
or

# development

$ yarn run start

# watch mode

$ yarn run start:dev

# production mode

$ yarn run start:prod
