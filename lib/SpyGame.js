(function(exports, $, console, undefined) {
	'use strict';
	var playerWeights = [],
		locationWeighting = [],
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
		this.init = false;
		this.round = {
			'number': 0,
			'spy': 0,
			'cPlayer': 0,
			'location': 'none',
			'numberOfPlayers': 1
		};
	};

	exports.Game.prototype = {
		initialize: function(numberOfPlayers) {
			playerWeights = [];
			locationWeighting = [];
			this.round.numberOfPlayers = numberOfPlayers;
			this.round.number = 0;

			for (var i = 0; i < numberOfPlayers; i++) {
				playerWeights.push(playerStartingWeight);
			}

			for (i = 0; i < locations.length; i++) {
				locationWeighting.push(100);
			}
			this.init = true;
		},
		getBasicInfo: function() {
			var basic = {};
			basic.playerName = 'Player ' + (parseInt(this.round.cPlayer) + 1);
			basic.roundNumber = this.round.number;
			basic.playerCount = this.round.numberOfPlayers;
			return basic;
		},
		getLocations: function() {
			return locations;
		},
		generateRound: function() {
			this.round.number++;
			this.round.cPlayer = 0;
			this.round.location = locations[chooseRandomWeighted(locationWeighting, 100)];
			// TODO: validate playerWeights array
			// if round.number % (num players * 8) == 0
			this.round.spy = chooseRandomWeighted(playerWeights, playerSpyWeightDiff);
		},
		nextPlayer: function() {
			this.round.cPlayer++;
		},
		beginSameRound: function() {
			this.round.cPlayer = 0;
		},
		getPlayerRole: function() {
			return (this.round.cPlayer == this.round.spy) ? 'You\'re the Spy' : this.round.location;
		}
	};

	function chooseRandomWeighted(_weightedArray, weightDiff){
		var sumOfWeights = 0;
			for (var i = 0; i < _weightedArray.length; i++) {
				sumOfWeights += _weightedArray[i];
			}
			var random = Math.floor((Math.random() * sumOfWeights));
			var weightedIndex, weighting;
			for (var i = 0; i < _weightedArray.length; i++) {
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
}(typeof exports === "undefined" ? (this.Spy = {}) : exports, jQuery, console));