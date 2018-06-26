/**
 * @module Spy
 */
(function(Game, $, console) {
    "use strict";
    /**
     * Trying jsdocs
     * @public
     */
    let playerWeights = [],
        locationWeighting = [],
        playerSpyWeightDiff = 4,
        playerStartingWeight = 10,
        locationWeightDiff= 1,
        locationStartingWeight = 1,
        locations = [];
    /**
     * Locations available in game
     * @type array
     */

    let locationOptions = [];
    locationOptions.push({"name": "Base Set", "list": [
        "Airplane",
        "Bank",
        "Beach",
        "Casino",
        "Church",
        "Circus tent",
        "Work Office party",
        "Castle",
        "Day spa",
        "Hospital",
        "Hotel",
        "Military base",
        "Movie studio",
        "Cruise Ship",
        "Passenger train",
        "Pirate ship",
        "Polar station",
        "Police station",
        "Restaurant",
        "Car Repair Shop",
        "Space station",
        "Submarine",
        "Supermarket",
        "Broadway Theatre",
        "Grade School",
        "University"
    ]});
    locationOptions.push({"name": "Secondary Set", "list": [
        "Amusement Park",
        "Ballet",
        "Night club",
        "Harbor / Boat Dock",
        "Field Stadium",
        "Skyscraper",
        "Bridge",
        "Cemetery",
        "Factory",
        "Farm",
        "Camp Site",
        "Golf Course",
        "Christmas Party",
        "Forth of July Party",
        "Thanksgiving Party",
        "Halloween Party",
        "Fire station",
        "Car Race Track",
        "Horse Race Track",
        "You're the Spy"
    ]});
    locationOptions.push({"name": "Third Set", "list": [
        "Art Museum",
        "Candy Factory",
        "Carnival",
        "Cat Show",
        "Coal Mine",
        "Constructions Site",
        "Ice Hocky Stadium",
        "Embassy",
        "Gas Station",
        "Jail",
        "Jazz Club",
        "Library",
        "Retirement Home",
        "Rock Concert",
        "Sight Seeing Bus",
        "Subway",
        "The U.N.",
        "Vineyard",
        "Wedding",
        "Zoo"
    ]});
    locationOptions.push({"name": "Things... My Set", "list": [
        "Things for Breakfast",
        "Things you hate to eat",
        "Things that are gross",
        "Animals at the Zoo",
        "Things you ride",
        "Things in your drawer",
        "Things that make you go Hmm",
        "Animals on a farm",
        "Things that hurt",
        "Things that are wet",
        "Things that are dry",
        "Things that are flat",
        "Things that are round",
        "Things that are red",
        "Things that are blue",
        "Things that are clear",
        "Things that are tall",
        "Things that are short",
        "Things that are funny",
        "Things that are old",
        "Things that are new",
        "Things that are borrowed",
        "Things that are hot",
        "Things that are cold",
        "Things that are sad",
        "Things that are scary",
        "Things that are delicious",
        "Things that smell bad"
    ]});
    // https://quizlet.com/8888703/game-of-things-flash-cards/
    // https://collectifbdp.com/the-game-of-things-flash-cards/
    /*
    Things that make sex fun!!!
Things that you will find in (name room of house..bathroom, kitchen, etc)
Things to wear to (occasion ...wedding, funeral, etc)
*/
    locationOptions.push({"name": "Things... 1-50 Set", "list": [
    "Things cannibals think about while dinning",
    "Things dogs are actually saying when they bark",
    "Things grown-ups wish they could still do.",
    "Things you should never put in your mouth",
    "Things not to do in a hospital",
    "Things not to do while driving",
    "Things not to tell your mother",
    "Things paramedics shouldn't say to a patient on the way to the hospital",
    "Things people do when no one is looking",
    "Things that are good",
    "Things that are harder than they look",
    "Things that are your favorite foods",
    "Things that you can use for transport (car, bike, bus, plane etc)",
    "Things that confirm your house is haunted",
    "Things that confirm your life is going downhill",
    "Things that go bad",
    "Things that happen in vegas that should stay in vegas",
    "Things that jiggle",
    "Things that make you feel stupid",
    "Things that make you giggle",
    "Things that make you uncomfortable",
    "Things that must be magic",
    "Things that shouldn't be made into video games!",
    "Things that shouldn't be passed from one generation to the next",
    "Things that smell terrible",
    "Things that squirt",
    "Things that you can trip over",
    "Things that you love to watch on tv!",
    "Things that you shouldn't do in public",
    "Things that you shouldn't swallow",
    "Things that you shouldn't throw off of a building",
    "Things that your parents would kill you for",
    "Things that would be fun to do in an elevator",
    "Things that would keep you out of heaven",
    "Things wouldn't want to be allergic to",
    "Things you can never find",
    "Things you do to get a job",
    "Things you do to relieve stress",
    "Things you do to stay warm",
    "Things you don't want to find in your bed",
    "Things you might find in a library",
    "Things you name home brewed beer",
    "Things you return from your christmas gifts",
    "Things you shop for on black friday",
    "Things you should be thankful for",
    "Things you should do to get ready for winter",
    "Things you should give as birthday gifts"
]});
locationOptions.push({"name": "Things... 51-100 Set", "list": [
"Things you shouldn't attempt to juggle",
"Things you shouldn't do on your birthday",
"Things you shouldn't do while babysitting",
"Things you shouldn't do when naked",
"Things you shouldn't do with glue",
"Things you shouldn't give trick-or-treaters",
"Things you shouldn't lick",
"Things you shouldn't play catch with",
"Things you shouldn't say to your in-laws",
"Things you shouldn't say to your boss",
"Things you shouldn't say when walking out of the bathroom",
"Things you shouldn't send your friends in a pic",
"Things you shouldn't tie to the roof of your car",
"Things you shouldn't wear to a wedding",
"Things you shouldn't wear to a funeral",
"Things you shouldn't carve into a pumpkin",
"Things you use to remove snow from your car",
"Things you wish for",
"Things you wish were included in a divorce settlement",
"Things you would ask a psychic",
"Things you would buy if you were rich",
"Things you would do if you were a giant",
"Things you would rather forget",
"Things you would rather put off till tomorrow",
"Things you would wish for if you were stranded on an island",
"Things you wouldn't do for a million dollars",
"Things you wouldn't want made into a movie",
"Things you wouldn't want to do in cemetery",
"Things you'd rather forget",
"Things your friends text you",
"Things your parents forgot to tell you",
"Things your parents would kill you for",
"Things you'll do when you retire",
"Things that would get a doctor sued for malpractice",
"Things you shouldn't do in front of a crowd",
"Things that give you a headache",
"Things you wouldn't want to clean",
"Things children shouldn't know",
"Things a gentleman shouldn't do",
"Things women know more about than men",
"Things you shouldn't give as a gift",
"Things that make you go ahhhh",
"Things you shouldn't do at the dinner table",
"Things you would consider strange to include on a resume",
"Things there should be an award for"
]});
    /**
     * Object definition sets up base vars
     * @memberOf Spy
     */
    Game.init = false;
    Game.setting = {useSpyGetsLocation: false};
   
    locations =  locationOptions[0].list;
    Game.round = {
        number: 0,
        spy: 0,
        cPlayer: 0,
        location: '',
        numberOfPlayers: 1
    };
    Game.initialize = function(numberOfPlayers) {
        locations = [];

        Game.round.number = 0;
        Game.round.numberOfPlayers = numberOfPlayers;
        playerWeights = [];

        for (let i = 0; i < numberOfPlayers; i++) {
            playerWeights.push(playerStartingWeight);
        }

        //locations setup
        $.each(Game.getLocationOptions(), function(key, val) {
            if ( Game.setting[`useSet${key}`]) {
                locations = $.merge(locations, Array.from(val.list));
            }
        });
       
        if (locations.length == 0) {
            locations = $.merge(locations, Game.getLocationOptions()[0].list);
            Game.setting[`useSet0`] = true;
        }
        locationWeighting = locations.map(function(x) {
            return locationStartingWeight;
        });
        Game.init = true;
    };
    /**
     * common data for majority of pages
     * @memberOf Spy.Game
     * @return {object} basic fields
     */
    Game.getBasicInfo = function() {
        var basic = {};
        basic.playerName = "Player " + (parseInt(Game.round.cPlayer) + 1);
        basic.roundNumber = Game.round.number;
        basic.playerCount = Game.round.numberOfPlayers;
        basic.playerWeights = playerWeights;
        basic.locationWeighting = locationWeighting;
        return basic;
    };
    Game.getLocations = function() {
        return locations;
    };
    Game.getLocationOptions = function() {
        return locationOptions;
    };
    
    Game.generateRound = function() {
        // TODO: validate playerWeights array
        // if round.number % (num players * 8) == 0

        Game.round.number++;
        Game.round.cPlayer = 0;
        var locationIndex = chooseRandomWeighted(
            Math.random(),
            locationWeighting
        );
        Game.round.location = locations[locationIndex];

        locationWeighting[locationIndex] = calculateNewWeight(
            locationWeighting[locationIndex],
            locationWeightDiff
        );
        var spyIndex = chooseRandomWeighted(Math.random(), playerWeights);
        Game.round.spy = spyIndex;
        playerWeights[spyIndex] = calculateNewWeight(
            playerWeights[spyIndex],
            playerSpyWeightDiff
        );
    };
    Game.nextPlayer = function() {
        Game.round.cPlayer++;
    };
    Game.beginSameRound = function() {
        Game.round.cPlayer = 0;
    };
    Game.getPlayerRole = function() {
        let spyText = "You're the Spy";
        if (Game.setting.useSpyGetsLocation) {
            //get random location
            spyText = this.round.location;
            do {
                let random = Math.floor(Math.random() * locations.length);
                spyText = locations[random];
            } while (spyText == this.round.location);
        }
        return this.round.cPlayer === this.round.spy
            ? spyText
            : this.round.location;
    };
    function calculateNewWeight(weightArrayIndex, diff) {
        return weightArrayIndex > diff ? weightArrayIndex - diff : 0;
    }
    function chooseRandomWeighted(randNum, _weightedArray) {
        let i;
        var sumOfWeights = _weightedArray.reduce(function(total, num) {
            return total + num;
        }, 0);
        // TODO: validate if sum is < 0, then ... reinit all?
        var randomWeight = Math.floor(randNum * sumOfWeights);
        for (i = 0; i < _weightedArray.length; i++) {
            randomWeight -= _weightedArray[i];
            if (randomWeight <= 0) {
                break;
            }
        }
        return i;
    }
})((window.Game = window.Game || {}), jQuery, console);
