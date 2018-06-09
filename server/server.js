const express = require('express');

const path = require('path');
const Publicpath = path.join(__dirname,'../public');
const port = process.env.PORT || 8080
var app = express();

app.use(express.static(Publicpath));

app.listen(port,() => {
    console.log(`server running at port ${port}`);
})
