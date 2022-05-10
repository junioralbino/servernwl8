import express from "express";



const app = express();

app.get('/users', (req, res) => {
   res.send('Hello Word junior')
});

app.listen(3333, () => {
 console.log('HTTP server Runing')
});