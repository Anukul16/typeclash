const express = require('express');
const app = express();
const paragraphRouter = require('../typingBackend/routes/paragraphRoute')
const cors = require('cors')

app.use(cors());

app.get('/', (req, res) => {
    console.log("working");
    res.send("Hello, World!"); 
});


app.use('/api', paragraphRouter);

app.listen(4000, () => {
    console.log("Server running on port 4000");
});
