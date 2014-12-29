/**
 * @module Spy
 */
(function(exports, console, undefined) {
	'use strict';
	/**
	 * Trying jsdocs
	 * @public
	 */
	var playerWeights = [],
		locationWeighting = [],
		playerSpyWeightDiff = 10,
		playerStartingWeight = 100;
	/**
	 * Locations availbe in game
	 * @type array
	 */
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
	/**
	 * Object definition sets up base vars
	 * @memberOf Spy
	 */
	exports.Game = function() {
		this.init = false;
		this.round = {
			'number': 0,
			'spy': 0,
			'cPlayer': 0,
			'location': 'none',
			'numberOfPlayers': 1
		};
	
		this.initialize = function(numberOfPlayers) {
			var i;
			playerWeights = [];
			locationWeighting = [];
			this.round.numberOfPlayers = numberOfPlayers;
			this.round.number = 0;

			for (i = 0; i < numberOfPlayers; i++) {
				playerWeights.push(playerStartingWeight);
			}

			for (i = 0; i < locations.length; i++) {
				locationWeighting.push(100);
			}
			this.init = true;
		},
		/**
		 * common data for majority of pages
		 * @memberOf Spy.Game
		 * @return {object} basic fields
		 */
		this.getBasicInfo = function() {
			var basic = {};
			basic.playerName = 'Player ' + (parseInt(this.round.cPlayer) + 1);
			basic.roundNumber = this.round.number;
			basic.playerCount = this.round.numberOfPlayers;
			return basic;
		};
		this.getLocations = function() {
			return locations;
		};
		this.generateRound = function() {
			this.round.number++;
			this.round.cPlayer = 0;
			this.round.location = locations[chooseRandomWeighted(locationWeighting, 100)];
			// TODO: validate playerWeights array
			// if round.number % (num players * 8) == 0
			this.round.spy = chooseRandomWeighted(playerWeights, playerSpyWeightDiff);
		};
		this.nextPlayer = function() {
			this.round.cPlayer++;
		};
		this.beginSameRound = function() {
			this.round.cPlayer = 0;
		};
		this.getPlayerRole = function() {
			return (this.round.cPlayer === this.round.spy) ? 'You\'re the Spy' : this.round.location;
		}
		return this;
	};

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
}(typeof exports === "undefined" ? (this.spy = {}) : exports, console));