const express = require('express');
// const cors = require('cors');

const app = express();
const port = process.env.PORT || 20000;


// cors middleware
// app.use(cors());

app.use((req, res, next) => {
  res.set({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  next();
});

// Index Route
app.get('/api', (req, res) => {
  res.json({
    data: [
      {
        circuitId: '1',
        circuitName: 'cdcdcd',
        Location: {
          locality: '343',
          country: 'AP'
        }
      },
      {
        circuitId: '5',
        circuitName: 'cdcdcdcd',
        Location: {
          locality: '4545',
          country: 'UN'
        }
      },
      {
        circuitId: '2',
        circuitName: 'wqeqeqeqweq',
        Location: {
          locality: 'cdcdcd',
          country: 'UK'
        }
      },
      {
        circuitId: '3',
        circuitName: 'tuytyutu',
        Location: {
          locality: 'cdcd',
          country: 'CN'
        }
      }]
  });
});

app.listen(port, () => {

});
