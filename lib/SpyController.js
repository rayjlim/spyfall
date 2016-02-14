(function(Controller, $, console, Game, undefined) {
    'use strict';
    Controller.showStart = function() {
        $.mobile.changePage('#setup');
    };
    Controller.showGamePlay = function() {
        $.mobile.changePage('#gamePlay');
    };
    Controller.showLocations = function() {
        $('#locationlist').empty();
        $.each(Game.getLocations(), function(key, val) {
            $("#locationlist").append('<li>' + val + '</li>');
        });
        // $('#locationlist').listview('refresh');
        $.mobile.changePage('#locations');
    };
    Controller.setupGame = function() {
        Game.initialize($("#playerCountOption").val());
        Game.generateRound();
        displayBasicInfo(Game.getBasicInfo());
        $.mobile.changePage('#pass');
    };
    Controller.showPlayersRole = function() {
        $('#locationVal').html(Game.getPlayerRole());
        $.mobile.changePage('#clue');
    };
    Controller.doneShowingRole = function() {
        if (Game.round.cPlayer < Game.round.numberOfPlayers - 1) {
            $('#locationVal').html('');
            Game.nextPlayer();
            displayBasicInfo(Game.getBasicInfo());
            $.mobile.changePage('#pass');
            return;
        }
        $.mobile.changePage('#gamePlay');
    };
    Controller.restartRound = function() {
        Game.beginSameRound();
        displayBasicInfo(Game.getBasicInfo());
        $.mobile.changePage('#pass');
    };
    Controller.startNewRound = function() {
        Game.generateRound();
        displayBasicInfo(Game.getBasicInfo());
        $.mobile.changePage('#pass');
    };
    Controller.roundSummary = function() {
        var wrapper = $('#summaryList');
        wrapper.html('');
        $(wrapper).append('<li>Location is: ' + Game.round.location + '</li>');
        $(wrapper).append('<li>The Spy is: Player' + (Game.round.spy + 1) + '</li>');
        wrapper.trigger('create');
        $.mobile.changePage('#roundSummary');
    };
    Controller.pageCheck = function(event, data) {
        if (!Game.init) {
            console.log('initialize');
            //load local storage, if available
            var storageObj = localStorage.getItem('spyfall.settings');
            var settings = JSON.parse(storageObj);
            console.log(settings);
            if (storageObj !== null) {
                Game.setting = settings;
            }
            Game.init = true;
            $.mobile.changePage('#setup');
        }
    };
    Controller.showSettings = function() {
        $('#useSpyGetsLocation').prop('checked', Game.setting.useSpyGetsLocation);
        
        $('#useBasicSet').prop('checked', Game.setting.useBasicSet);
        
        // console.log('useBasicSet'+Game.setting.useBasicSet);
        $('#useSeconarySet').prop('checked', Game.setting.useSeconarySet);
        
        $('#useTopicSet').prop('checked', Game.setting.useTopicSet);
        

//         $('#useSpyGetsLocation').checkboxradio('refresh');
// $('#useBasicSet').checkboxradio('refresh');
// $('#useSeconarySet').checkboxradio('refresh');
// $('#useTopicSet').checkboxradio('refresh');
        $.mobile.changePage('#settings');
    };
    Controller.saveSettings = function() {
        Game.setting.useSpyGetsLocation = $('#useSpyGetsLocation:checked').length == 1;
        Game.setting.useBasicSet = $('#useBasicSet:checked').length == 1;
        Game.setting.useSeconarySet = $('#useSeconarySet:checked').length == 1;
        Game.setting.useTopicSet = $('#useTopicSet:checked').length == 1;
        localStorage.setItem('spyfall.settings', JSON.stringify(Game.setting));
        console.log('saveSettings' + $('#useSpyGetsLocation:checked').length == 1);
        // Game.setPlayerSpyWeightDiff($('#playerSpyWeightDiff').val());
        Game.initialize($("#playerCountOption").val());
        window.history.back();
    };

    function displayBasicInfo(basic) {
        $('.currentPlayer').html(basic.playerName);
        $('.currentRound').html(basic.roundNumber);
        $('.playerCount').html(basic.playerCount);
    }
})(window.Controller = window.Controller || {}, jQuery, console, Game);