const express = require('express');
const app = express();
const port = 4040;
const axios = require('axios');
const URL = require('./config');
const attachment = 'id='

const servers = [
  URL.loader1,
  URL.loader2,
]

console.log(servers[1])
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
let current = 0
const request = async (req, res) => {
  const id = req.url.split('=')[1];
  if (id) {
    const server = servers[current];
    current === (servers.length - 1) ? current = 0 : current++
    console.log(current)
    try {
      const response = await axios.get(server + id)
      res.send(response.data)
    }
    catch(err){
    }
  }
}
app.get('/:id', request)
app.listen(port, () => {
  console.log(`main load balance listening on ${port}`)
});
//need to figure out how to get service to use another one, when one of these goes down +++


