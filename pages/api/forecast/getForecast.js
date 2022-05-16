
import axios from 'axios'

export default async function handler(req, res) {

    //Record query parameters
    const params = req.query
    
    
    const response = await axios.get(`https://pro.openweathermap.org/data/2.5/onecall?lat=${params.lat}&lon=${params.lon}&exclude=minutely,hourly&appid=${process.env.REACT_APP_API_KEY}&units=imperial`)
    const currentCity = await axios.get(`https://pro.openweathermap.org/data/2.5/forecast/daily?lat=${params.lat}&lon=${params.lon}&exclude=minutely,hourly&appid=${process.env.REACT_APP_API_KEY}&units=imperial`)

    
    return(res.status(200).send({
        data: response.data,
        city: currentCity.data.city.name
    })) 

    res.status(404).send("INTERNAL SERVER ERROR 404")
  }
