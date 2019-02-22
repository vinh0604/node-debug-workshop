const express = require('express')
const geolib = require('geolib')
const app = express()
const port = 3000
const supermarket = require('./supermarket')

app.get('/', (req, res) => res.send('Hello world!'))

app.get("/api/supermarket/nearby", (req, res) => {
    const lat = req.query.lat
    const long = req.query.long

    nearby = supermarket.reduce((prev, next) => 
        calculateDistance(lat, long, prev) > calculateDistance(lat, long, next) ? 
            next : 
            prev)

    res.json(
        Object.assign({ distance: calculateDistance(lat, long, nearby) }, nearby))
})

app.listen(port, () => console.log(`Server started on ${port}`))

function calculateDistance(lat, long, location) {
    return geolib.getDistance(
        {
            latitude: lat, 
            longitude: long
        },
        {
            latitude: location.lat, 
            longitude: location.long
        },
        10
    )
}