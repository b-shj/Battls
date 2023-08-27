const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express()

// ALL APP MIDDLEWARE
app.use(cors());
app.use(passport.initialize())
app.use(express.json());


// ROUTE IMPORTS
const pollRoutes = require('./routes/pollRoutes');
const authRoutes = require('./routes/authRoutes');

// ROUTER USE
app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
});

app.use('/polls', pollRoutes);
app.use('/auth', authRoutes);

//DATABASE CONNECTION
const CONNECTION_URL = process.env.MONGO_URL;
mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
  
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});
  

// SERVER START
const port = 5000;
app.listen(port, () => {
    console.log( `Server is up running at ${port}` );
});

