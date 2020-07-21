const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const weatherForcast = require('./utils/weatherforcast');

const app = express();
const port = process.env.PORT || 3000;

// Define path for express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

//Setup static directory to serve
app.use(express.static(publicPath));

//Setup handlebars engine and views location
app.set('views', viewsPath);
app.set('view engine', 'hbs');

hbs.registerPartials(partialPath);

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    content: 'Weather',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    content: 'Weather',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    content: 'Weather',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You should provide an address here!',
    });
  }
  geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    weatherForcast(latitude, longitude, (error, forcast) => {
      if (error) {
        return res.send({ error });
      }
      return res.send({
        forcastdata: forcast,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 404,
    errormessage: 'Help article is not found',
    content: 'Weather',
  });
});
app.get('/*', (req, res) => {
  res.render('404', {
    title: 404,
    errormessage: '404 Page',
    content: 'Weather',
  });
});

//server listening on port
app.listen(port, () => {
  console.log('Server is running on the port ' + port + '!');
});
