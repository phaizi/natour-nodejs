const fs = require('fs')
const express = require('express')

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`),
)

const app = express()
app.use(express.json()) // using middleware to get json body from requests

const apiPrefix = '/api/v1/'

// for getting tours
app.get(`${apiPrefix}tours`, (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  })
})

// for creating new tour
app.post(`${apiPrefix}tours`, (req, res) => {
  const newId = tours[tours.length - 1].id + 1
  const newTour = { id: newId, ...req.body }
  tours.push(newTour)
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      })
    },
  )
})

const port = 3000

app.listen(port, () => {
  console.log(`App running on port ${port}...`)
})
app.on
