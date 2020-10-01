const express = require('express');
const app = express();
const port = 5000;

const monggoose = require('mongoose');
monggoose.connect('mongodb+srv://sooya:!1gustn2486@cluster0.oflbb.mongodb.net/Cluster0?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(()=>console.log('MongoDb Connected...'))
.catch(err => console.log(err));



app.get('/', function(req, res) {
  res.send('hello world!!');
});

app.listen(port, ()=> console.log(`Example app listening on port ${port}!`))