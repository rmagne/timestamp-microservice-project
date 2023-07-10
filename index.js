// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const PORT = process.env.PORT || 3030;



app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get('/api/:date?', (req, res) => {
  const regexp = /^(\d{13})?$/;
  if (regexp.test(req.params.date)) {
    const date = new Date(parseInt(req.params.date))
    res.json({
      "unix": date.getTime(),
      "utc": date.toUTCString()
    });
  } else {
    const date = new Date(req.params.date);
    if (!isNaN(date.getDate())) {
      res.json({
        "unix": date.getTime(),
        "utc": date.toUTCString()
      });
    }
    else if(!req.params.date){
      const defaultDate = new Date();
      res.json({
"unix": defaultDate.getTime(),
"utc": defaultDate.toUTCString()
      });
    }
    else {
      res.json({ error: "Invalid Date" });
    }
  }
})

