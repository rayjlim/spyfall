(function(Controller, $, console, Game, undefined) {
  "use strict";
  Controller.showStart = function() {
    $.mobile.changePage("#setup");
  };
  Controller.showGamePlay = function() {
    $.mobile.changePage("#gamePlay");
  };
  Controller.showLocations = function() {
    $("#locationlist").empty();
    $.each(Game.getLocations(), function(key, val) {
      $("#locationlist").append("<li>" + val + "</li>");
    });

    $("#locationlist").enhanceWithin();
    $.mobile.changePage("#locations");
  };
  Controller.setupGame = function() {
    Game.initialize($("#playerCountOption").val());
    Game.generateRound();
    displayBasicInfo(Game.getBasicInfo());
    $.mobile.changePage("#pass");
  };
  Controller.showPlayersRole = function() {
    $("#locationVal").html(Game.getPlayerRole());
    $.mobile.changePage("#clue");
  };
  Controller.doneShowingRole = function() {
    if (Game.round.cPlayer < Game.round.numberOfPlayers - 1) {
      $("#locationVal").html("");
      Game.nextPlayer();
      displayBasicInfo(Game.getBasicInfo());
      $.mobile.changePage("#pass");
      return;
    }
    $.mobile.changePage("#gamePlay");
  };
  Controller.restartRound = function() {
    Game.beginSameRound();
    displayBasicInfo(Game.getBasicInfo());
    $.mobile.changePage("#pass");
  };
  Controller.startNewRound = function() {
    Game.generateRound();
    displayBasicInfo(Game.getBasicInfo());
    $.mobile.changePage("#pass");
  };
  Controller.roundSummary = function() {
    var wrapper = $("#summaryList");
    wrapper.html("");
    $(wrapper).append("<li>Location is: " + Game.round.location + "</li>");
    $(wrapper).append(
      "<li>The Spy is: Player" + (Game.round.spy + 1) + "</li>"
    );
    wrapper.trigger("create");
    $.mobile.changePage("#roundSummary");
  };
  Controller.pageCheck = function(event, data) {
    if (!Game.init) {
      console.log("initialize");
      //load local storage, if available
      var storageObj = localStorage.getItem("spyfall.settings");
      var settings = JSON.parse(storageObj);
      console.log(settings);
      if (storageObj !== null) {
        Game.setting = settings;
      }
      Game.init = true;
      Game.initialize($("#playerCountOption").val());
      $.mobile.changePage("#setup");
    }
  };
  Controller.showSettings = function() {
    console.log(Game.setting);
    $("#useSpyGetsLocation").prop("checked", Game.setting.useSpyGetsLocation);
    $("#useSpyPlayer1").prop("checked", Game.setting.useSpyPlayer1);

    $("#setInputs").html(``);
    $.each(Game.getLocationOptions(), function(key, val) {
      let size = Array.from(val.list);
      $("#setInputs").append(`<label for="set${key}\">${val.name} (${size.length})</label>
                    <input type="checkbox" name="set${key}" id="set${key}"/>`);

      $(`#set${key}`).prop("checked", !!Game.setting[`useSet${key}`]);
    });

    $("#setInputs").enhanceWithin();
    $.mobile.changePage("#settings");
  };
  Controller.saveSettings = function() {
    Game.setting.useSpyGetsLocation =
      $("#useSpyGetsLocation:checked").length == 1;
    Game.setting.useSpyPlayer1 = $("#useSpyPlayer1:checked").length == 1;

    $.each(Game.getLocationOptions(), function(key, val) {
      Game.setting[`useSet${key}`] = $(`#set${key}:checked`).length == 1;
    });
    console.log(Game.setting);
    localStorage.setItem("spyfall.settings", JSON.stringify(Game.setting));
    console.log("saveSettings" + $("#useSpyGetsLocation:checked").length == 1);
    // Game.setPlayerSpyWeightDiff($('#playerSpyWeightDiff').val());
    Game.initialize($("#playerCountOption").val());
    window.history.back();
  };

  function displayBasicInfo(basic) {
    $(".currentPlayer").html(basic.playerName);
    $(".currentRound").html(basic.roundNumber);
    $(".playerCount").html(basic.playerCount);
  }
})((window.Controller = window.Controller || {}), jQuery, console, Game);
