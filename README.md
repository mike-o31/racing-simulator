Race Simulator

#How To Run
Install all dependencies for both the frontend and backend. Run npm start on backend first, then after that starts, run npm start on the frontend.

#Description
The project allows a user to simulate races between 2 to 10 different 'racers' as many times as they want, while keeping track of the winner of each race. Once you stop the server, all race data is lost.

#Goals
Complete the front end to interact with the back end.
The back end has four different endpoints (api)
/api/racers provides information on each racer
/api/race/start will begin a new race and open up a persistent connect so server sent events can be pushed
/api/winners will provide the winner for each race
Using these endpoints, you should complete a front end application that allows an end user to:

Start 1 to n races
See how many races each racer has won
View total energy used per vehicle during the latest race
Additionally, when a user begins a race, the server will open a persistent connection so it can issue Server Sent Events (SSE) to the front end application. This means that once a race has begun, the server will send the position of each racer on a scale from 0 to 100 (0 is the start; 100 is the finish line). The winner will have crossed the finish line (i.e., their position will be >= 100).

The front end application should display the progress of each racer moving from left (0) to right (100) as the race is in progress. Once the race is over display who won the race. The user should be able to see who won each race and the number of races each racer has won.

Finally, the user should be able to see how much energy is used per vehicle per race.

#Notes
The front end application can have multiple views if you feel it is best.
The front end application ideally should be responsive for different viewport sizes.
You are free to use vanilla javascript, typescript or a framework with either language.
A skeleton of a VueJS framework is provided if desired (front-end)
