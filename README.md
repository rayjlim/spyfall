spyfall
=======

another implementation of the game
This project grew out wanting to experiment with new technologies. 
jQuery mobile, mocha, chai, testem, etc.

The objective was to create a unit testable app, but also use IIFE.
The main roadblock was when the modules were exported as Globals and I didn't know how to mock the Globals.
I may experiment and try converting the modules to Singleton globals, but for now it's this way.

page uses a CDN reference, meaning no need to install the dependencies unless it's for development.

for testing
-----------
npm install (will install jquery, mocha, chai, sinon, testem)