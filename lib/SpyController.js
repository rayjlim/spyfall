(function(exports, $, console, undefined) {
    'use strict';

    var game;
    exports.SpyController = function(_game) {
        game = _game;

        this.showStart = function() {
            $.mobile.changePage('#setup');
        };
        this.showGamePlay = function() {
            $.mobile.changePage('#gamePlay');
        };
        this.showLocations = function() {
            $.each(game.getLocations(), function(key, val) {
                $("#locationlist").append('<li>' + val + '</li>');
            });
            // $('#locationlist').listview('refresh');
            $.mobile.changePage('#locations');
        };
        this.setupGame = function() {
            game.initialize($("#playerCountOption").val());
            game.generateRound();
            displayBasicInfo(game.getBasicInfo());
            $.mobile.changePage('#pass');
        };
        this.showPlayersRole = function() {
            $('#locationVal').html(game.getPlayerRole());
            $.mobile.changePage('#clue');
        };
        this.doneShowingRole = function() {
            if (game.round.cPlayer < game.round.numberOfPlayers - 1) {
                $('#locationVal').html('');
                game.nextPlayer();
                displayBasicInfo(game.getBasicInfo());
                $.mobile.changePage('#pass');
                return;
            }

            $.mobile.changePage('#gamePlay');
        };
        this.restartRound = function() {
            game.beginSameRound();
            displayBasicInfo(game.getBasicInfo());
            $.mobile.changePage('#pass');
        };
        this.startNewRound = function() {
            game.generateRound();
            displayBasicInfo(game.getBasicInfo());
            $.mobile.changePage('#pass');
        };
        this.roundSummary = function() {
            var wrapper = $('#summaryList');
            wrapper.html('');
            $(wrapper).append('<li>Location is: ' + game.round.location + '</li>');
            $(wrapper).append('<li>The Spy is: Player' + (game.round.spy + 1) + '</li>');

            wrapper.trigger('create');
            $.mobile.changePage('#roundSummary');
        };
        this.pageCheck = function(event, data) {
            if (!game.init) {
                $.mobile.changePage('#setup');
            };
        };
        return this;
    };

    function displayBasicInfo(basic) {
        $('.currentPlayer').html(basic.playerName);
        $('.currentRound').html(basic.roundNumber);
        $('.playerCount').html(basic.playerCount);
    }
}(typeof exports === "undefined" ? (this.lpt = {}) : exports, jQuery, console));