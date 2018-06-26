(function(exports, undefined) {
    "use strict";

    var startingTime = 8 * 60, //in seconds
        count = startingTime,
        t,
        isRunning = false,
        outputId,
        audioId;

    exports.Timer = function(_outputId, _audioId) {
        outputId = _outputId;
        audioId = _audioId;

        this.run = function() {
            if (isRunning) {
                isRunning = false;
                clearTimeout(t);
            } else {
                runTimer();
            }
        };
        this.reset = function() {
            isRunning = false;
            clearTimeout(t);
            count = startingTime;
            updateDisplay();
        };
        this.setDefault = function(_newDefaultMinutes) {
            startingTime = _newDefaultMinutes * 60;
        };
        this.addOne = function() {
            count += 60;
            updateDisplay();
        };
        this.subOne = function() {
            count -= 60;
            updateDisplay();
        };
        this.playAudio = function() {
            document.getElementById(audioId).play();
        };
        return this;
    };

    function updateDisplay() {
        var minutes = Math.floor(count / 60);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        var seconds = count - minutes * 60;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        document.getElementById(outputId).innerHTML = minutes + ":" + seconds;
    }

    function runTimer() {
        if (count <= 0) {
            // time is up
            count = 0;
            updateDisplay();
            isRunning = false;
            document.getElementById(audioId).play();
        } else {
            updateDisplay();
            count--;
            isRunning = true;
            t = setTimeout(runTimer, 1000);
        }
    }
})(typeof exports === "undefined" ? (this.countdown = {}) : exports);
