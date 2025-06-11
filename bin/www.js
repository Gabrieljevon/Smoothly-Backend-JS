const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require('path');
const cors = require("cors");
require('dotenv').config()


//parse application json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//routes
const routesAdmin = require("../routes/admin");
routesAdmin(app);

const routesUser = require("../routes/pelanggan");
routesUser(app);

app.use('/images/profile', express.static(path.join(__dirname, '../images/profile')));
app.use('/images/bukti-pembayaran', express.static(path.join(__dirname, '../images/bukti-pembayaran')));
app.use('/images/default', express.static(path.join(__dirname, '../images/default')));

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);  
});
