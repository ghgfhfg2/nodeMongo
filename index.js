const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');

const config = require('./config/key');

const { User } = require('./models/User');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


const monggoose = require('mongoose');
monggoose.connect(config.mongoURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(()=>console.log('MongoDb Connected...'))
.catch(err => console.log(err));



app.get('/', function(req, res) {
  res.send('hello world!!1');
});

app.post('/register', (req,res) => {

    
    const user = new User(req.body);

    user.save((err, userInfo) => {
        if(err) return res.json({ success: false, err})
        return res.status(200).json({
            success: true
        })
    });

})

app.listen(port, ()=> console.log(`Example app listening on port ${port}!`))