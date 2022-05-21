import {numberToDay} from './functions'

/**
 * Class that wraps the object being returned by the WeatherAPI call
 * 
 */
class weatherObject{
    /**
     * 
     * @param {Number} date     Timestamp in UTC
     * @param {Object} temp     Temperature object from API call
     * @param {Object} weather  Wrapper for weather object from API call
     */
    constructor(date, temp, weather, city){
        this.date = date
        this.temp = temp
        this.weather = weather
        this.city = city
    }

    /**
     * A method that parses the UTC attribute of the object into a substring representing the day of the week of said timestamp
     * @returns {String}    A string of the dt object parsed into a readable date format
     */
    parseDate(){
        return numberToDay(this.date);
    }
    
    /**
     * A Getter function returning the max temp of the temp object
     * @returns {Number}    An integer representing the max temperature of the day
     */
    get tempMax(){
        return Number.parseInt(this.temp.max);
    }
    
    /**
     * A Getter function returning the min temp of the temp object
     * @returns {Number}    An integer representing the min temperature of the day
     */
    get tempMin(){
        return Number.parseInt(this.temp.min);
    }

    /**
     * A Getter function returning the midday temp of the temp object
     * @returns {Number}    An integer representing the mid temperature of the day
     */
    get tempMid(){
        return Number.parseInt(this.temp.day)
    }

    get currentCity(){
        return this.city
    }
}

export {weatherObject}