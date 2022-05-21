
import axios from 'axios'

export default async function handler(req, res) {

    //Record query parameters
    const params = req.query
    
    const responseObject = {data: null, city: null}
    
    const response = await axios.get(`https://pro.openweathermap.org/data/2.5/onecall?lat=${params.lat}&lon=${params.lon}&exclude=minutely,hourly&appid=${process.env.REACT_APP_API_KEY}&units=imperial`).then((res) => {responseObject.data=res.data})
    const currentCity = await axios.get(`https://pro.openweathermap.org/data/2.5/forecast/daily?lat=${params.lat}&lon=${params.lon}&exclude=minutely,hourly&appid=${process.env.REACT_APP_API_KEY}&units=imperial`).then((res) => {responseObject.city=res.data.city.name})

    
    
    return(res.status(200).send(responseObject)) 

    res.status(404).send("INTERNAL SERVER ERROR 404")
  }
