/**
 * @module Spy
 */
(function(Game, console, undefined) {
    'use strict';
    /**
     * Trying jsdocs
     * @public
     */
    var playerWeights = [],
        locationWeighting = [],
        playerSpyWeightDiff = 30,
        playerStartingWeight = 100;
    /**
     * Locations availbe in game
     * @type array
     */
    var locations = [];
    var locationsBase = ['Airplane', 'Bank', 'Beach', 'Casino', 'Church', 'Circus tent', 'Work Office party', 'Castle', 'Day spa', 'Hospital', 'Hotel', 'Military base', 'Movie studio', 'Cruise Ship', 'Passenger train', 'Pirate ship', 'Polar station', 'Police station', 'Restaurant', 'Car Repair Shop', 'Space station', 'Submarine', 'Supermarket', 'Broadway Theatre', 'Grade School', 'University'];
    var locationsSecondary = ['Amusement Park', 'Ballet', 'Night club', 'Harbor / Boat Dock', 'Stadium', 'Skyscraper', 'Bridge', 'Cemetery', 'Factory', 'Farm', 'Camp Site', 'Golf Course', 'Christmas Party', 'Forth of July Party', 'Thanksgiving Party', 'Halloween Party', 'Fire station', 'Car Race Track', 'Horse Race Track'];
    var topics = ['Things for Breakfast', 'Things you hate to eat', 'Things that are gross', 'Animals at the Zoo', 'Things you ride', 'Things in your drawer', 'Things that make you go Hmm', 'Animals on a farm', 'Things that make you smile', 'Things that hurt', 'Things that are wet', 'Things that are dry', 'Things that are flat', 'Things that are round', 'Things that are red', 'Things that are blue', 'Things that are clear', 'Things that are tall', 'Things that are short', 'Things that are funny', 'Things that are old', 'Things that are new', 'Things that are borrowed', 'Things that are hot', 'Things that are cold', 'Things that are sad', 'Things that are scary', 'Things that are delicious', 'Things that smell bad'];
    /**
     * Object definition sets up base vars
     * @memberOf Spy
     */
    Game.init = false;
    Game.setting = {};
    Game.setting.useSpyGetsLocation = true;
    Game.setting.useBasicSet = true;
    Game.setting.useSeconarySet = false;
    Game.setting.useTopicSet = false;
    Game.round = {
        'number': 0,
        'spy': 0,
        'cPlayer': 0,
        'location': 'none',
        'numberOfPlayers': 1
    };
    Game.initialize = function(numberOfPlayers) {
        var i;
        locations = [];
        //locations
        if (Game.setting.useTopicSet) {
            locations = $.merge(locations, topics);
        }
        if (Game.setting.useSeconarySet) {
            locations = $.merge(locations, locationsSecondary);
        }
        if (Game.setting.useBasicSet || locations.length == 0) {
            locations = $.merge(locations, locationsBase);
        }        
        playerWeights = [];
        locationWeighting = [];
        Game.round.numberOfPlayers = numberOfPlayers;
        Game.round.number = 0;
        for (i = 0; i < numberOfPlayers; i++) {
            playerWeights.push(playerStartingWeight);
        }
        for (i = 0; i < locations.length; i++) {
            locationWeighting.push(100);
        }
        Game.init = true;
    };
    /**
     * common data for majority of pages
     * @memberOf Spy.Game
     * @return {object} basic fields
     */
    Game.getBasicInfo = function() {
        var basic = {};
        basic.playerName = 'Player ' + (parseInt(Game.round.cPlayer) + 1);
        basic.roundNumber = Game.round.number;
        basic.playerCount = Game.round.numberOfPlayers;
        return basic;
    };
    Game.getLocations = function() {
        return locations;
    };
    Game.generateRound = function() {
        Game.round.number++;
        Game.round.cPlayer = 0;
        Game.round.location = locations[chooseRandomWeighted(locationWeighting, 100)];
        // TODO: validate playerWeights array
        // if round.number % (num players * 8) == 0
        Game.round.spy = chooseRandomWeighted(playerWeights, playerSpyWeightDiff);
    };
    Game.nextPlayer = function() {
        Game.round.cPlayer++;
    };
    Game.beginSameRound = function() {
        Game.round.cPlayer = 0;
    };
    Game.getPlayerRole = function() {
        var spyText = 'You\'re the Spy';
        if (Game.setting.useSpyGetsLocation) {
            //get random location
            spyText = this.round.location;
            do {
                var random = Math.floor((Math.random() * locations.length));
                spyText = locations[random];
            }
            while (spyText == this.round.location);
        }
        return (this.round.cPlayer === this.round.spy) ? spyText : this.round.location;
    }

    function chooseRandomWeighted(_weightedArray, weightDiff) {
        var sumOfWeights = 0,
            i,
            weightedIndex,
            weighting;
        for (i = 0; i < _weightedArray.length; i++) {
            sumOfWeights += _weightedArray[i];
        }
        var random = Math.floor((Math.random() * sumOfWeights));
        for (i = 0; i < _weightedArray.length; i++) {
            weighting = _weightedArray[i];
            random -= weighting;
            if (random <= 0) {
                _weightedArray[i] -= weightDiff;
                weightedIndex = i;
                break;
            }
        }
        return weightedIndex;
    }
})(window.Game = window.Game || {}, jQuery, console);