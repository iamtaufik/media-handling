require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const mediaRouter = require('./routes/media.routes');

app.use(express.static('public'));
app.use('/api/v1', mediaRouter);

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
