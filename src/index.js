const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const clientRoutes = require('./routes/client');
const productRoutes = require('./routes/product');

//settings
app.set("port", 3000);

app.use(cors());

//middelwares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use(clientRoutes);
app.use(productRoutes);

//run
app.listen(app.get('port'), () => {
    console.log('Server on Port 3000')
})