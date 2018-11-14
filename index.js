const express = require('express')
const morgan = require('morgan')
require('dotenv').config();
const path = require('path');
var cors = require('cors')
const env = require('firebase-functions').config().env

const app = express()

app.use(cors({
  preflightContinue: true,
  origin: process.env.POLLER_APP,
  // "access-control-allow-headers" : "Content-Type, Authorization, Content-Length, X-Requested-With",
  // "access-control-allow-methods" :"GET,PUT,POST,DELETE,OPTIONS",
}))
app.use(morgan('common'))
const staticAssetsPath = path.join(__dirname, 'build');
app.use(express.static(staticAssetsPath));

app.get('*', (req, res) => res.sendFile(path.join(staticAssetsPath, "index.html")))


app.listen(process.env.PORT, () => {
})