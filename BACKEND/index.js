const express = require('express')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const connectDatabase = require('./config/database')
const app = express();
const path = require('path')
// const punycode = require('punycode/')
const user = require('./routes/userroute')
const profile = require('./routes/profileroute')
const persona = require('./routes/personaroute')
const post = require('./routes/postroute')
const gemniroute = require('./routes/gemniroute')
const cors = require('cors')

app.use(cors())

app.use(express.json())
connectDatabase();

app.use(bodyParser.json())
app.use(cookieParser())

// app.use(express.static(path.join(__dirname, 'public', 'build')));



app.use('/api',gemniroute)
app.use('/api',user)
app.use('/api',profile)
app.use('/api',persona)
app.use('/api',post)

// app.use('*', function (request, response) {
//     response.sendFile(path.join(__dirname, 'public', 'build', 'index.html'));
// });

app.listen(3000,()=>{
    console.log("Listening on local host 3000")
})