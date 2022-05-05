import axios from "axios"
import geoip from 'geoip-lite'
import os from 'os'
import publicIp from "public-ip"

/**
 * API Function that requests a 8 day forecast from openWeatherMapAPI and returns an object containing the city from your publicIP and the JSON object containing the forecast
 * @returns {Object}    Object with two attributes, data containing the API response, and city with your approximate location
 */
export default async function getDailyWeather(req, res) {

    var myip = await publicIp.v4();
    const geoip_request = geoip.lookup(myip)

    
    const response = await axios.get(`https://pro.openweathermap.org/data/2.5/onecall?lat=${geoip_request.ll[0]}&lon=${geoip_request.ll[1]}&exclude=minutely,hourly&appid=${process.env.REACT_APP_API_KEY}&units=imperial`)
    const currentCity = await axios.get(`https://pro.openweathermap.org/data/2.5/forecast/daily?lat=${geoip_request.ll[0]}&lon=${geoip_request.ll[1]}&exclude=minutely,hourly&appid=${process.env.REACT_APP_API_KEY}&units=imperial`)

    
    res.status(200).send({
        data: response.data,
        city: currentCity.data.city.name
    })

    res.status(404).send("INTERNAL SERVER ERROR 404")
  }
