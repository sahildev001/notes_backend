const express = require('express');
const userRouter = require('./routes/userRoutes');
const notesRouter = require('./routes/notesRoutes');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();


dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//middleware
app.use((req,res,next)=>{
    console.log(`HTTP Method - ${req.method} , URL - ${req.url}`);
    next();
});


app.use('/users', userRouter);
app.use('/notes',notesRouter);

app.get('/',(req,res)=>{
    res.send("Notes Backend");
});

const port = process.env.PORT ||3000;


mongoose.connect(process.env.MONGO_URL).then(()=>{
   console.log('connected mongo');
   app.listen(port, ()=>{
    console.log("server started at "+port);
});
}).catch((e)=>{
    console.log(`error on mongo server ${e}`);
});

