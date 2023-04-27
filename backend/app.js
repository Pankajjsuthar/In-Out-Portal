const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const users = require('./api/user');
const { use } = require('./api/user');

connectDB(); 

const app = express();

app.use(express.static('uploads'))
app.use(cors({ origin: true, credentials: true }));

app.use(express.json({ extended: false }));

app.use('/api/users', users);
app.use("/",express.static("uploads"));



app.get('/', (req, res) => res.send("Hello")); 

const port = process.env.PORT || 8082; 

app.listen(port, () => console.log(`Server running on port ${port}`));

