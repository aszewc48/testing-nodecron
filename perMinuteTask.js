const cron = require('node-cron')
const express = require('express')
const hbs = require('hbs')
const mongoose = require('mongoose')

mongoose
  .connect('mongodb://localhost/practice')
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err))

const app = express()

const Selector = require('./models/Selector.js')

app.set('view engine','hbs')
app.use(express.static(__dirname + '/public'))

app.get('/', (req,res) => {
    res.render('index.hbs')
})
app.get('/showTime', (req,res) => {
    let dateSelect = req.query.tripStart.slice(8,10)
    let monthSelect = req.query.tripStart.slice(5,7)
    let hourSelect = req.query.appt.slice(0,2)
    let minuteSelect = req.query.appt.slice(3,5)
    let randomVariable = `a${(Math.floor(Math.random()*100000000))}`
    cron.schedule(`${minuteSelect} ${hourSelect} ${dateSelect} ${monthSelect} *`, () => {
        console.log('success')
     })
     let setSchedule = {
        minute: minuteSelect,
         hour: hourSelect,
         day: dateSelect,
         month: monthSelect,
         id: randomVariable 
    }
    Selector.create(setSchedule)
    .then(savedSchedule => console.log(savedSchedule))
    .catch(err => console.log(err))
    res.render('result.hbs', {
        result: setSchedule
    })
})

app.get('/displayAll', (req,res) => {
    let displayAll = Selector.find({})
    .then(data => console.log(data))
    res.render('viewAll.hbs', {
        displayAll
    })
})


// minute 0-59, hour 0-23, day 1-31, month 1-12, day of the week 0-6
// cron.schedule('* * * * *', () => {
//     console.log('first task')
// })

app.listen(3000)