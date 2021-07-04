/*******************************************************************************
  * IMPORTANT: Make sure to run "npm install" in your root before "npm start"
 *******************************************************************************/
//initial setup (package requires, port number setup)
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const http = require('http');
const { Server } = require("socket.io");

const PORT = process.env.PORT || 5000; // So we can run on heroku || (OR) localhost:5000
const cors = require('cors');

const app = express();

 
app.disable('view cache');
//Heroku connection
const corsOptions = {
    origin: "https://git.heroku.com/cse341-team-activities.git",
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    family: 4
};

// Route setup. You can implement more in the future!
const pr01Routes = require('./routes/pr01'); //route to pr01.js file week1
const pr09Routes = require('./routes/pr09'); //route to pr09.js file week9
const pr10Routes = require('./routes/pr10'); //route to pr10.js file week10
const ta01Routes = require('./routes/ta01');
const ta02Routes = require('./routes/ta02');
const ta03Routes = require('./routes/ta03'); 
const ta04Routes = require('./routes/ta04'); 
const ta05Routes = require('./routes/ta05');

app
   .use(
        session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false
        })
   )
   .use(express.static(path.join(__dirname, 'public')))
   .set('views', path.join(__dirname, 'views'))
   .set('view engine', 'ejs')
  
   .use(bodyParser({extended: false})) // For parsing the body of a POST
   
   .use('/pr01', pr01Routes) //for pr01.js
   .use('/pr09', pr09Routes) //for pr09.js
   .use('/pr10', pr10Routes) //for pr10.js
   .use('/ta01', ta01Routes)
   .use('/ta02', ta02Routes) 
   .use('/ta03', ta03Routes) 
   .use('/ta04', ta04Routes)
   .use('/ta05', ta05Routes) 
         
   .get('/', (req, res, next) => {
     // This is the primary index, always handled last. 
     res.render('pages/index', {
         title: 'Welcome to my CSE341 repo',
         path: '/'
    });
  })
   .use((req, res, next) => {
     // 404 page
     res.render('pages/404', {
         title: '404 - Page Not Found', 
         path: req.url
    });
  })

  // .listen(PORT, () => console.log(`Listening on ${ PORT }`));
  
// Socket.io wiring 
const server = http.createServer(app);  
const io = new Server(server);
io.on('connection', (socket) => {
  console.log('Socket.IO a user connected');
  socket.on('client message', function(msg) {
    console.log('Socket.io Client message: ' + msg);
    // io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets
    io.emit('broadcast message', msg);
    console.log('Socket.io Broadcast to All', msg)

  });
  socket.on('disconnect', () => {
    console.log('Socket.IO user disconnected');
  });
});
server.listen(PORT, () => {
    console.log('listening on ', PORT);
});
 