const fs = require('fs')
const express = require('express')

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`),
)

const app = express()

const apiPrefix = '/api/v1/'

app.get(`${apiPrefix}tours`, (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  })
})

const port = 3000

app.listen(port, () => {
  console.log(`App running on port ${port}...`)
})
app.on
