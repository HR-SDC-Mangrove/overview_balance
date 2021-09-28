const express = require('express');
const axios = require('axios')

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/:id', (req, res) => {
  const id = req.url.split('=')[1];
  const alternate = async ()=> {
    if (id % 2 === 0) {

      return new Promise((resolve, reject) => {
        axios.get(`http://ec2-13-52-255-0.us-west-1.compute.amazonaws.com:3101/products/product_id=${id}`)
          .then((r1Data) => {
            console.log('sent to server 1')
            resolve(r1Data.data)
          })
      })
    }

    if (id % 2 === 1){
      return new Promise((resolve, reject) => {

        axios.get(`http://ec2-54-193-11-113.us-west-1.compute.amazonaws.com:3101/products/product_id=${id}`)
          .then((r2Data) => {
            console.log('sent to server 2')
            resolve(r2Data.data)
          })
      })
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