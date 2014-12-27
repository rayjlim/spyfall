(function(exports, $, console, undefined) {
	'use strict';

	var game;
	exports.SpyController = function(_game) {
		game = _game;
	};

	exports.SpyController.prototype.showStart = function() {
		console.log('a showStart');
		$.mobile.changePage('#setup');
	};

	exports.SpyController.prototype.showGamePlay = function() {
		$.mobile.changePage('#gamePlay');
	};

	exports.SpyController.prototype.showLocations = function() {
		$.each(game.getLocations(), function(key, val) {
			$("#locationlist").append('<li>' + val + '</li>');
		});
		// $('#locationlist').listview('refresh');
		$.mobile.changePage('#locations');
	};

	exports.SpyController.prototype.setupGame = function() {
		console.log('setupGame');
		game.initialize($("#playerCountOption").val());

		game.generateRound();
		displayBasicInfo(game.getBasicInfo());
		$.mobile.changePage('#pass');

	};

	exports.SpyController.prototype.showPlayersRole = function() {
		$('#locationVal').html(game.getPlayerRole());
		$.mobile.changePage('#clue');
	};

	exports.SpyController.prototype.doneShowingRole = function() {
		var round = game.getRound();
		if (round.cPlayer < round.numberOfPlayers - 1) {
			$('#locationVal').html('');
			game.nextPlayer();
			displayBasicInfo(game.getBasicInfo());
			$.mobile.changePage('#pass');
			return;
		}

		$.mobile.changePage('#gamePlay');
	};

	exports.SpyController.prototype.restartRound = function() {
		game.setCurrentPlayer(0);
		displayBasicInfo(game.getBasicInfo());
		$.mobile.changePage('#pass');
	};
	exports.SpyController.prototype.startNewRound = function() {
		game.generateRound();
		displayBasicInfo(game.getBasicInfo());
		$.mobile.changePage('#pass');
	};

	exports.SpyController.prototype.roundSummary = function() {
		var wrapper = $('#summaryList');
		var round = game.getRound();
		wrapper.html('');
		$(wrapper).append('<li>Location is: ' +round.location + '</li>');
		$(wrapper).append('<li>The Spy is: Player' + (round.spy+1) + '</li>');

		wrapper.trigger('create');
		$.mobile.changePage('#roundSummary');
	};

	exports.SpyController.prototype.pageCheck = function(event, data) {
		console.log('pageinit: ' );
		if (!game.isInitialized()) {
			console.log('initialize');
			$.mobile.changePage('#setup');
		}
	};

	function displayBasicInfo(basic) {
		$('.currentPlayer').html(basic.playerName);
		$('.currentRound').html(basic.roundNumber);
		$('.playerCount').html(basic.playerCount);
	}
}(typeof exports === "undefined" ? (this.lpt = {}) : exports, jQuery, console));