const express = require('express');
const DBConnection = require('./config/db');
const dotenv = require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 8000; 

app.use(cors());
app.use(bodyParser.json());

app.use('/api/users',require('./routes/userRoutes'));
app.use('/api/books',require('./routes/bookRoutes'));
app.use('/api/transactions',require('./routes/transactionRoutes'));

app.use(express.static(path.join(__dirname,'build')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'build', 'index.html'));
});


app.listen(PORT, () => {
    try{
        console.log(`Server is running on port ${PORT}`);
        DBConnection;

    }catch(err){
        console.log(err);
    }
});
