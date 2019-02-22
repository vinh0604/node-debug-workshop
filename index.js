const express = require('express')
const geolib = require('geolib')
const app = express()
const port = 3000
const supermarket = require('./supermarket')

app.get('/', (req, res) => res.send('Hello world!'))

app.get("/api/supermarket/nearby", (req, res) => {
    const lat = req.params.lat
    const long = req.params.long
    
    const distance = geolib.getDistance(
        {
            latitude: lat, 
            longitude: long
        },
        {
            latitude: supermarket[0].lat, 
            longitude: supermarket[0].long
        },
        10
    )

    res.json({ distance: distance })
})

app.listen(port, () => console.log(`Server started on ${port}`))