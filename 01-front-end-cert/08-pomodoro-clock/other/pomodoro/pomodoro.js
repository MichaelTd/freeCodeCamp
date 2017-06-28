var sessionLength = 25;
var breakLength = 5;

function addSessionTime (){
       sessionLength += 1;
       $("#timer-session").text(sessionLength);
       $("#timeLeft").text(sessionLength);
}

function deduceSessionTime(){
    if (sessionLength > 1){
        sessionLength -= 1;
    } else {
        sessionLength = 1;
    }
    $("#timer-session").text(sessionLength);
    $("#timeLeft").text(sessionLength);
}

function deduceBreakTime() {
    if (breakLength > 1){
        breakLength -= 1;
    } else {
        breakLength = 1;
    }
    $("#timer-break").text(breakLength);
}

function addBreakTime(){
    breakLength += 1;
    $("#timer-break").text(breakLength);
}

function startTimer() {
    seconds = 0;
    countDown(sessionLength, seconds);
}

function countDown(m,s) {
    countInt = setInterval(function(){
        
    if (m == 0 && s == 0) {
        clearInterval(countInt);
        if (loop == 0) {
            timeLeft = breakLength;
            loop += 1;
            $('#sessionName').text('Current Break');
        } else {
            timeLeft = sessionLength;
            loop -= 1;
            $('#sessionName').text('Current Session');
        }
        alarm.play();
        countDown(timeLeft,0);
    } else if (s != 0) {
        if (s <= 10){
            s -= 1;
            timeLeft = m + ':0' + s;
        } else {
            s -= 1;
            timeLeft = m + ':' + s;
        }
    } else if (s == 0) {
        s = 59;
        m -= 1;
        timeLeft = m + ':' + s;
    }
        $('#timeLeft').text(timeLeft);
        
    }, 1000);
}
