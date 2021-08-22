const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

//settings
app.set("port", 3000);

//middelwares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//run
app.listen(app.get('port'), () => {
    console.log('Server on Port 3000')
})