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

// for getting a particular tour
app.get(`${apiPrefix}tours/:id`, (req, res) => {
  const id = Number(req.params.id)
  const tour = tours.find((tour) => tour.id === id)

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID!',
    })
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  })
})

// for updating a tour
// but it does not work completely
// as it will be implemented when we will connect the db
app.patch(`${apiPrefix}tours/:id`, (req, res) => {
  const id = Number(req.params.id)
  const tour = tours.find((tour) => tour.id === id)

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID!',
    })
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<updated tour here>',
    },
  })
})

app.delete(`${apiPrefix}tours/:id`, (req, res) => {
  const id = Number(req.params.id)
  const tour = tours.find((tour) => tour.id === id)

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID!',
    })
  }

  res.status(204).json({
    status: 'success',
    data: null,
  })
})

const port = 3000

app.listen(port, () => {
  console.log(`App running on port ${port}...`)
})
app.on
