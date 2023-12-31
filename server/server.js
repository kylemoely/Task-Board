const path = require('path');
const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./routes');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(routes);

sequelize.sync({force:false}).then(() => {
    app.listen(PORT, () => console.log(`Now listening at localhost:${PORT}`));
})