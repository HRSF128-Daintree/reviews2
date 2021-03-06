const express = require('express');
const bodyParser = require('body-parser');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const controller = require('./controllers/reviews.js');

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }
} else {
  const app = express();
  const port = 3004;

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/reviews', express.static('public'));

  app.get('/hotels/:hotelName', controller.getH);
  app.get('/users/:username', controller.getU);

  app.listen(port, () => console.log(`Reviews app listening at ${port}`));
}

// const app = express();
// const port = 3004;
// const controller = require('./controllers/reviews.js');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/reviews', express.static('public'));

// app.get('/hotels/:hotelName', controller.getH);
// app.get('/users/:username', controller.getU);
// // app.post('/reviews', controller.post);
// // app.delete('/reviews/:reviewId', controller.delete);
// // app.patch('/reviews/:reviewId', controller.patch);

// app.listen(port, () => console.log(`Reviews app listening at ${port}`));
