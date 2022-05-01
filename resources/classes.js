
/**
 * Class that wraps the object being returned by the WeatherAPI call
 * 
 */
class weatherObject{
    constructor(date, temp, weather){
        this.date = date
        this.temp = temp
        this.weather = weather
    }

    
}

export {weatherObject}