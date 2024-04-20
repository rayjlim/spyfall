Spyfall
=======

Another implementation of the game. The focus was on making a mobile accessible version.

Try it out : [Demo](https://qty.pot.mybluehost.me/sites/spyfall/)

This project grew out wanting to experiment with new technologies. 
jQuery mobile, mocha, chai, testem, etc.

The objective was to create a unit testable app, but also use IIFE.
The main roadblock was when the modules were exported as Globals and I didn't know how to mock the Globals.
I may experiment and try converting the modules to Singleton globals, but for now it's this way.

page uses a CDN reference, meaning no need to install the dependencies unless it's for development.

key features
-------------
-   Player weighting system so the player picked as the spy is evenly distributed.
-   Timer
-   Restart display of round
-   Round Summary page

for Development & testing
-----------
npm install 

(will install jquery, mocha, chai, sinon, testem)

run testem on commandline

for Reporting
-----------
npm install -g plato

plato -r -l .jshintrc -d report lib

Future feature wishlist
---------
-   Customizable player names
-   Customizable locations
-   Settings editor for default timer and player weight difference value
-   Handle reset of weight system when enough plays occur and weighting values are too low
-   Add JSdoc comments
-   Use pub/sub for timer, Change Timer to publish count changes/Controller to sub to timer events
-   Include Roles
-   Int'l translations
-   Adjust CSS for clue string length
