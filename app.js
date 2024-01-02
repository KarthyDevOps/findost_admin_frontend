const express = require('express');
const logger = require('morgan');
const path = require('path');
const compression = require('compression');
const app = express();

app.use(logger('dev'));
app.use(express.static('./build'));
app.use('/static', express.static('ui'));
app.use( compression() )
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, './build', 'index.html'));
});

const PORT = process.env.PORT || 2273;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
