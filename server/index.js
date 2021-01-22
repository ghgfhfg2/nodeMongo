const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const config = require("./config/key");
const { auth } = require("./middleware/auth");

const { User } = require("./User");
const { Check } = require("./Check");
const { Image } = require("./Images");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const monggoose = require("mongoose");
monggoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDb Connected..."))
  .catch((err) => console.log(err));
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.get("/api/hello", (req, res) => {
  res.send("안녕하세요~");
});

var multer = require('multer'); // express에 multer모듈 적용 (for 파일업로드)
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  }),
});
app.post("/api/users/upload", upload.single('file'), (req, res) => {
  const image = new Image({...req.file,type:"lunch"});
  req.file ? 
  image.save(
    (err, image) => {
      console.log()
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  ) : res.json({ nofile: true })
});
app.post("/api/users/upload2", upload.single('file'), (req, res) => {
  const image = new Image({...req.file,type:"check"});
  req.file ? 
  image.save(
    (err, image) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  ) : res.json({ nofile: true })
});

app.use('/images', express.static('uploads'));

app.get("/api/users/getLunchImg", (req, res) => {
  Image.findOne({type:"lunch"})
  .sort({"_id":-1})
  .exec((err, img) => {
    res.status(200).json({
      img
    })
  })
})
app.get("/api/users/getCheckImg", (req, res) => {
  Image.findOne({type:"check"})
  .sort({"_id":-1})
  .exec((err, img) => {
    res.status(200).json({
      img
    })
  })
})


app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      joinSuccess: true,
    });
  });
});

app.post("/api/users/login", (req, res) => {
  User.findOne({ id: req.body.id }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          massage: "비밀번호가 틀렸습니다.",
        });
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        if(req.body.isRemember){
          res.cookie('rememberID', req.body.id);
          res.cookie('rememberPassword', req.body.password);
        }else{
          res.clearCookie('rememberID','rememberPassword')
        }
        res.cookie("x_auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
        });
      });
    });
  });
});

app.get("/api/users/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    id: req.user.id,
    name: req.user.name,
    part: req.user.part,
    role: req.user.role,
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

app.post("/api/users/check", (req, res) => {
  const check = new Check(req.body);
  check.save((err, checkInfo) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({
      checkSuccess: true,
    });
  });
});

app.post("/api/users/lastCheck", (req, res) => {
  User.findOneAndUpdate(
    { id: req.body.id },
    { lastCheck: req.body.date },
    (err, user) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
});

app.post("/api/users/checkData", (req, res) => {
  Check.findOne({ id: req.body.id })
    .sort({ date: -1 })
    .exec((err, data) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({
        dataCheck: true,
        data,
      });
    });
});

app.post("/api/users/history", (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 30;
  let skip = parseInt(req.body.skip);
  Check.find({ id: req.body.id })
    .sort({ date: -1 })
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({
        dataCheck: true,
        listSize: data.length,
        data,
      });
    });
});

app.post("/api/users/historyAll", (req, res) => {
  Check.find({ date: req.body.date })
    .sort(
       (req.body.sort === 'time') ? { time: -1 } : 
       (req.body.sort === 'time2') ? { time: 1 } : 
       (req.body.sort === 'name') ? {name: 1} : 
       (req.body.sort === 'part') ? {part: 1} : { time: -1 }
    )
    .exec((err, data) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({
        dataCheck: true,
        data,
      });
    });
});

app.get("/api/users/userNormal", (req, res) => {
  User.find({ role: 0 }).exec((err, data) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({
      dataCheck: true,
      data,
    });
  });
});

app.post("/api/users/idCheck", (req, res) => {
  User.find({ id: req.body.id })
  .exec((err, data) => {
    if (err) return res.status(400).json({ success: false, err });
    if (data == "") return res.status(200).json({ idConfirm: true });
    res.status(200).json({idConfirm: false})
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

