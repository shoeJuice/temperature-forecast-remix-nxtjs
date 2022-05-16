
export default async function handler(req, res){
    const params = req.query;
    console.log(req)
    console.log(req.body)
    console.log(req.query)
    console.log(req.cookies)
    
    switch(req.method){
        case 'GET':
            res.status(200).send(`Latitude: ${params.lat ? params.lat : "NaN"}\nLongitude: ${params.lon ? params.lon : "NaN"}`)
            break
        case 'POST':
            res.status(200).send('Can\'t post here buddy. Sorry')
            break
        default:
            res.status(200).send("Hmm.. What happened?")
    }
    
}