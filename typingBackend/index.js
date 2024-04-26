const express = require('express');
const app = express();
const paragraphRouter = require('../typingBackend/routes/paragraphRoute')
const userRouter = require('../typingBackend/routes/userRoute.js')
const cors = require('cors')
const db = require('../typingBackend/config/dbconfig.js')

app.use(cors());
// app.use(express.json())



app.get('/', (req, res) => {
    console.log("working");
    res.send("Hello, World!"); 
});


app.use('/api', paragraphRouter);
app.use('/auth',userRouter);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});

