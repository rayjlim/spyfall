(function(exports, $, console, undefined) {
	'use strict';
	var playerWeights = [],
		locationWeighting = [],
		init = false,
		round = {
			'number': '0',
			'spy': '0',
			'cPlayer': '0',
			'location': 'none',
			'numberOfPlayers': '1'
		},
		playerSpyWeightDiff = 10,
		playerStartingWeight = 100;


	var locations = [
		'Airplane',
		'Bank',
		'Beach',
		'Casino',
		'Church / Cathedral',
		'Circus tent',
		'Work Office party',
		'Castle',
		'Day spa',
		'Hospital',
		'Hotel',
		'Military base',
		'Movie studio',
		'Cruise Ship',
		'Passenger train',
		'Pirate ship',
		'Polar station',
		'Police station',
		'Restaurant',
		'Car Repair Shop',
		'Space station',
		'Submarine',
		'Supermarket',
		'Broadway Theatre',
		'Grade School',
		'University',

		'Amusement Park',
		'Ballet',
		'Bar / Night club',
		'Harbor / Boat Dock',
		'Stadium',
		'Skyscraper',
		'Bridge',
		'Cemetery',
		'Factory',
		'Farm',
		'Camp Site',
		'Golf Course',
		'Christmas Party',
		'Forth of July Party',
		'Thanksgiving Party',
		'Halloween Party',
		'Fire station',
		'Car Race Track',
		'Horse Race Track'
	];
	exports.Game = function() {
	};

	exports.Game.prototype.isInitialized = function() {
		return init;
	};

	exports.Game.prototype.initialize = function(numberOfPlayers) {
		playerWeights = [];
		locationWeighting = [];
		round.numberOfPlayers = numberOfPlayers;
		round.number = 0;

		for (var i = 0; i < numberOfPlayers; i++) {
			playerWeights.push(playerStartingWeight);
		}

		for (i = 0; i < $(locations).length; i++) {
			locationWeighting.push(100);
		}
		init = true;
	};

	exports.Game.prototype.setRound = function(_newVal) {
		round = _newVal;
	};

	exports.Game.prototype.getRound = function() {
		return round;
	};

	exports.Game.prototype.getLocations = function() {
		return locations;
	};

	exports.Game.prototype.generateRound = function() {
		round.number++;
		round.cPlayer = 0;
		round.location = this.chooseLocation();
		round.spy = this.chooseSpy();
	};

	exports.Game.prototype.nextPlayer = function() {
		round.cPlayer++;
	};

	exports.Game.prototype.setCurrentPlayer = function(_index) {
		round.cPlayer = _index;
	};

	exports.Game.prototype.getPlayerRole = function() {
		return (round.cPlayer == round.spy) ? 'You\'re the Spy' : round.location;
	};

	exports.Game.prototype.chooseLocation = function() {
		var sumOfWeights = 0;
		for (var i = 0; i < $(locationWeighting).length; i++) {
			sumOfWeights += locationWeighting[i];
		}
		var random = Math.floor((Math.random() * sumOfWeights));
		var weightedIndex;
		$.each($(locationWeighting), function(key, weighting) {
			random -= weighting;
			if (random <= 0) {
				console.log('::' + key);
				locationWeighting[key] -= 100;
				weightedIndex = key;
				return false;
			}
		});
		return locations[weightedIndex];
	};

	exports.Game.prototype.chooseSpy = function() {
		// TODO: validate playerWeights array
		// if round.number % (num players * 8) == 0

		var sumOfWeights = 0;
		for (var i = 0; i < $(playerWeights).length; i++) {
			sumOfWeights += playerWeights[i];
		}
		var random = Math.floor((Math.random() * sumOfWeights));
		var weightedIndex;
		$.each($(playerWeights), function(key, weighting) {
			// ***The next two lines are the heart of this algorithm***
			// decrement the random by the current weighting.
			random -= weighting;
			if (random <= 0) {
				playerWeights[key] -= playerSpyWeightDiff;
				weightedIndex = key;
				return false;
			}
		});
		return weightedIndex;
	};

	exports.Game.prototype.getBasicInfo = function() {
		var basic = {};
		basic.playerName = 'Player ' + (round.cPlayer + 1);
		basic.roundNumber = round.number;
		basic.playerCount = round.numberOfPlayers;
		return basic;
	};
}(typeof exports === "undefined" ? (this.Spy = {}) : exports, jQuery, console));