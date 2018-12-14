# Train Scheduler

Simple tool that allows user to view and update train schedules.

Live site: https://skmanik.github.io/Train-Scheduler

## Instructions
* Use the form at the bottom of the page to add a train to the schedule.
* Note: Be sure to fill in all of the inputs or the form will not register.

## Implementation

* Firebase database to store and load train times. These are continuously synchronized, so multiple tabs are supported
* Trains are stored as objects containing train name, destination, first departure time, and departure frequency
* Moment.js to parse, format, and compute each train's next arrival time
