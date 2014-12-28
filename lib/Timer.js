(function(exports, undefined) {
    'use strict';

    var startingTime = 8 * 60, //in seconds
        count = startingTime,
        t,
        outputId,
        audioId;

    exports.Timer = function(_outputId, _audioId) {
        outputId = _outputId;
        audioId = _audioId;
    };

    exports.Timer.prototype = {
        Start: function() {
            if (timer.isRunning) {
                timer.isRunning = false;
                clearTimeout(t);
            } else {
                runTimer();
            }
        },
        Reset: function() {
            timer.isRunning = false;
            clearTimeout(t);
            count = startingTime;
            updateDisplay();
        },
        setDefault: function(_newDefaultMinutes) {
            startingTime = _newDefaultMinutes * 60;
        },
        addOne: function() {
            count += 60;
            updateDisplay();
        },
        subOne: function() {
            count -= 60;
            updateDisplay();
        },
        playAudio: function() {
            document.getElementById(audioId).play();
        }
    };

    function updateDisplay() {
        var minutes = Math.floor(count / 60);
        minutes = (minutes < 10) ? '0' + minutes : minutes;
        var seconds = count - (minutes * 60);
        seconds = (seconds < 10) ? '0' + seconds : seconds;
        document.getElementById(outputId).innerHTML = minutes + ":" + seconds;
    }

    function runTimer() {
        if (count <= 0) { // time is up
            count = 0;
            updateDisplay();
            timer.isRunning = false;
            document.getElementById(audioId).play();
        } else {
            updateDisplay();
            count--;
            timer.isRunning = true;
            t = setTimeout(runTimer, 1000);
        }
    }

}(typeof exports === "undefined" ? (this.Countdown = {}) : exports));