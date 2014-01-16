var digit=-1,
    sec=0,
    min = 0,
    currtime,
    timer_is_on=0;

function timer(){
        if(timer_is_on){
            digit++;       
        if (digit <= 9)
            digit = '0' + digit;
            document.getElementById("digits").innerHTML=digit;
        }
        if(digit>59){
            sec++;
            
            if(sec>59){
            min++;
            if(min <= 9){
                min = '0' + min;
            }
            document.getElementById("minutes").innerHTML=min;
            sec = 0;

        }if(sec <= 9){
                sec = '0' + sec;
            }
            document.getElementById("secs").innerHTML=sec;
            digit=0;

        }    
}

function activate(){
        if(!timer_is_on){
                timer_is_on=1;
                currtime=setInterval(timer, 10);
                timer();
        }
}

function deactivate(endTime){
        if(timer_is_on){
            timer_is_on=0;
            endTime[0] = parseInt(min);
            endTime[1] = parseInt(sec);
            endTime[2] = parseInt(digit);
            digit=-1;
            sec=0;
            min =0;
            clearInterval(currtime);
            document.getElementById("digits").innerHTML='00';
            document.getElementById("minutes").innerHTML='00';
            document.getElementById("secs").innerHTML='00';
            return endTime; 
        }
}

function lapTime(currTime){
        if(timer_is_on){
            currTime[0] = parseInt(min);
            currTime[1] = parseInt(sec);
            currTime[2] = parseInt(digit);
            return currTime;    
        }
}