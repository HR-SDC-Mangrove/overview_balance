const express = require('express');
const axios = require('axios')
const URL = require('./config.js')
const attachment = 'products/product_id='
const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.get('/:id', (req, res) => {
  const id = req.url.split('=')[1];
  const alternate = async ()=> {

    if (id <= 250000) {
      return new Promise((resolve, reject) => {
        axios.get(URL.service1 + attachment + id)
          .then((service1Response) => {
            resolve(service1Response.data)
          }).catch((err) => {console.log(err)})
      }).catch((err) => console.log(err))
    }
    if (id > 250000 && id <= 500000) {
      return new Promise((resolve, reject) => {
        axios.get(URL.service2 + attachment + id)
          .then((service2Response) => {
            resolve(service2Response.data)
          }).catch((err) => {console.log(err)})
      }).catch((err) => (console.log(err)))
    }

    if (id > 500000 && id <= 750000) {
      return new Promise((resolve, reject) => {
        axios.get(URL.service3 + attachment + id)
          .then((service3Response) => {
            resolve(service3Response.data)
          }).catch((err) => {console.log(err)})
      }).catch((err) => (console.log(err)))
    }

    if (id > 750000 && id <= 1000011) {
      return new Promise((resolve, reject) => {
        axios.get(URL.service4 + attachment + id)
          .then((service4Response) => {
            resolve(service4Response.data)
          }).catch((err) => {console.log(err)})
      }).catch((err) => (console.log(err)))
    }

  }
  alternate().then((data) => {
    if (data) {
      res.send(data)
    }

  })
});
app.listen(port, () => {
  console.log(`balance listening on port ${port}`)
})



// if (id % 2 === 0) {

//   return new Promise((resolve, reject) => {
//     axios.get(`http://ec2-13-52-255-0.us-west-1.compute.amazonaws.com:3101/products/product_id=${id}`)
//       .then((r1Data) => {
//         console.log('sent to server 1')
//         resolve(r1Data.data)
//       })
//   })
// }

// if (id % 2 === 1){
//   return new Promise((resolve, reject) => {

//     axios.get(`http://ec2-54-193-11-113.us-west-1.compute.amazonaws.com:3101/products/product_id=${id}`)
//       .then((r2Data) => {
//         console.log('sent to server 2')
//         resolve(r2Data.data)
//       })
//   })
// }