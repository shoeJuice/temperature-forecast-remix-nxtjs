
import {css, keyframes} from '@emotion/css'
import {weatherObject} from './classes'



/**
 * Function to return the time since the Unix Epoch into MM-DD-YYYY format
 * @param {Number} seconds Seconds since Unix Epoch
 * @returns {String}       Time in MM-DD-YYYY format
 */
function unixTimeToHumanReadable(seconds)
    {
 
        // Save the time in Human
        // readable format
        let ans = "";
 
        // Number of days in month
        // in normal year
        let daysOfMonth = [ 31, 28, 31, 30, 31, 30,
                              31, 31, 30, 31, 30, 31 ];
 
        let currYear, daysTillNow, extraTime,
            extraDays, index, date, month, hours,
            minutes, secondss, flag = 0;
 
        // Calculate total days unix time T
        daysTillNow = parseInt(seconds / (24 * 60 * 60), 10);
        extraTime = seconds % (24 * 60 * 60);
        currYear = 1970;
 
        // Calculating current year
        while (daysTillNow >= 365)
        {
            if (currYear % 400 == 0 ||
               (currYear % 4 == 0 &&
                currYear % 100 != 0))
            {
                daysTillNow -= 366;
            }
            else
            {
                daysTillNow -= 365;
            }
            currYear += 1;
        }
 
        // Updating extradays because it
        // will give days till previous day
        // and we have include current day
        extraDays = daysTillNow + 1;
 
        if (currYear % 400 == 0 ||
           (currYear % 4 == 0 &&
            currYear % 100 != 0))
            flag = 1;
 
        // Calculating MONTH and DATE
        month = 0; index = 0;
        if (flag == 1)
        {
            while (true)
            {
                if (index == 1)
                {
                    if (extraDays - 29 < 0)
                        break;
 
                    month += 1;
                    extraDays -= 29;
                }
                else
                {
                    if (extraDays -
                        daysOfMonth[index] < 0)
                    {
                        break;
                    }
                    month += 1;
                    extraDays -= daysOfMonth[index];
                }
                index += 1;
            }
        }
        else
        {
            while (true)
            {
                if (extraDays - daysOfMonth[index] < 0)
                {
                    break;
                }
                month += 1;
                extraDays -= daysOfMonth[index];
                index += 1;
            }
        }
 
        // Current Month
        if (extraDays > 0)
        {
            month += 1;
            date = extraDays;
        }
        else
        {
            if (month == 2 && flag == 1)
                date = 29;
            else
            {
                date = daysOfMonth[month - 1];
            }
        }
 
        // Calculating HH:MM:YYYY
        hours = parseInt(extraTime / 3600, 10);
        minutes = parseInt((extraTime % 3600) / 60, 10);
        secondss = parseInt((extraTime % 3600) % 60, 10);
 
        ans += currYear.toString();
        ans += "-";
        ans += month.toString();
        ans += "-";
        ans += date.toString();
        
        
 
        // Return the time
        return ans;
    }


    /** 
        * Parses date into respective date of the week
        * @param {number} dtSeconds Seconds since the Unix Epoch
        * @return {String}          Substring of the day of the week from UTC
       */
   function numberToDay(dtSeconds){
        let milliseconds = dtSeconds * 1000
        let date = unixTimeToHumanReadable(dtSeconds)
        let dateObject = new Date(milliseconds)
        //console.log("Day of week: ", dateObject.getDay())
        let dayOfWeek = ''
        switch(dateObject.getDay()){
            case 0:
                dayOfWeek = 'Sunday'
                break
            case 1:
                dayOfWeek = 'Monday'
                break
            case 2:
                dayOfWeek = 'Tuesday'
                break
            case 3:
                dayOfWeek = 'Wednesday'
                break
            case 4:
                dayOfWeek = 'Thursday'
                break
            case 5:
                dayOfWeek = 'Friday'
                break
            default:
                dayOfWeek = 'Saturday'
                break
        }
        
        return dayOfWeek.substring(0, 3)
   }


   function getApproximateLocation(){
       
   }

   /**
    * Getter function returning the keyframes needed to render a fadeIn animation 
    * @returns {keyframes} CSS keyframes outlining the fadeIn effect
    */
   function getFadeFrames(){
       return keyframes`0% {opacity: 0;}
       25% {opacity: .25;
             backdrop-filter: blur(16px);}
       50% {opacity: .50;
             backdrop-filter: blur(12px);}
       75% {opacity: .75;
             backdrop-filter: blur(8px);}
       85%{
            opacity: .85;
            backdrop-filter: blur(4px);}
        95%{
            opacity: .95;
            backdrop-filter: blur(5px);
        }
       100% {opacity: 1;
             backdrop-filter: blur(6px);}`
   }
   
   /**
    * Method returning array of weatherObject instances constructed using data passed through props
    * @param {Object[]} propArray    props needed to initialize weatherObject instances
    * @returns {weatherObject[]}      Array containing initalized weatherObject instances
    */
   function initializeWeatherObjectArray(propArray){
       //Construct an empty array
       const weatherObjectArray = new Array();

       //Check if propArray is an array
       if(Array.isArray(propArray)){
           propArray = propArray.slice(1, 7)
           propArray.map((id, key) => {
               //Instantiate new weatherObject using corresponding dailyObject attributes
               let tempWeatherObject = new weatherObject(id.dt, id.temp, id.weather[0])
               //Push weatherObject into weatherObjectArray
               weatherObjectArray.push(tempWeatherObject)
           })
       }

       //Print to the console the array containing the newly instantiated weatherObjects
       console.log(weatherObjectArray)
       return weatherObjectArray;
   }

   function getWeatherObject(date, temp){
       const weatherObjectRef = require('./classes')

       return new weatherObjectRef.weatherObject(date, temp)
   }

export {unixTimeToHumanReadable, numberToDay, getFadeFrames, getWeatherObject, initializeWeatherObjectArray}