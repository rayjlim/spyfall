(function(exports, $, console, undefined) {
    'use strict';

    var startingTime = 8 * 60, //in seconds
        t,
        count = startingTime,
        outputId,
        audioId;

    exports.Timer = function(_outputId, _audioId) {
        outputId = _outputId;
        audioId = _audioId;
    };
    /**
     * Draw the timer display
     *
     * @return {} none.
     */
    function updateDisplay() {
        var minutes = Math.floor(count / 60);
        minutes = (minutes < 10) ? '0' + minutes : minutes;
        var seconds = count - (minutes * 60);
        seconds = (seconds < 10) ? '0' + seconds : seconds;
        $('#' + outputId).html(minutes + ":" + seconds);
    }

    function runTimer() {
        console.log('start: ' + count);

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

    exports.Timer.prototype.Start = function() {
        if (timer.isRunning) {
            console.log('pause');
            timer.isRunning = false;
            clearTimeout(t);
        } else {
            runTimer();
        }
    };

    exports.Timer.prototype.Reset = function() {
        console.log('reset');
        // resets countdown

        timer.isRunning = false;
        clearTimeout(t);
        count = startingTime;
        updateDisplay();
    };

    exports.Timer.prototype.setDefault = function() {
        startingTime = defaultTimer * 60;
    };
    exports.Timer.prototype.addOne = function() {
        count += 60;
        updateDisplay();
    };
    exports.Timer.prototype.subOne = function() {
        count -= 60;
        updateDisplay();
    };

}(typeof exports === "undefined" ? (this.Countdown = {}) : exports, jQuery, console));