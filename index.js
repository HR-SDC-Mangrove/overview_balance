const express = require('express');
const app = express();
const port = 4040;
const axios = require('axios');
const URL = require('./config');
const attachment = 'id='

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
let counter = 0;
app.get('/:id', (req, res) => {
  const id = req.url.split('=')[1];
  counter += 1;
  // send to different load balancer based on count
  const alternate = async () => {
    if (counter === 1) {
      console.log('sending to loader 1')
      return new Promise((resolve, reject) => {
        axios.get(URL.loader1 + id)
          .then((loader1Data) => {
            resolve(loader1Data.data);
          })
          .catch((err) => console.log(err))
      }).catch((err) => console.log(err))
    }
    if (counter === 2) {
      console.log('sending to loader 2')
      return new Promise((resolve, reject) => {
        // axios.get(URL.loader2 + attachment + id)
        // .then((data) => {
          resolve('send two here')

        // })
        // .catch((err) => console.log(err))
      }).catch((err) => console.log(err))
    }
    // send/reset count on 3
    if (counter === 3) {
      counter = 0;
      console.log('sending to loader 3 and reseting the count', counter)
      return new Promise((resolve, reject) => {
        // axios.get(URL.loader3 + attachment + id)
        // .then((data) => {
        resolve('send three here')
        // })
        // .catch((err) => console.log(err))
      }).catch((err) => console.log(err))

    }
  }
  alternate().then((response) => {
    console.log('sending response')
    res.send(response)
  })
});
app.listen(port, () => {
  console.log(`main load balance listening on ${port}`)
});
//need to figure out how to get service to use another one, when one of these goes down +++


