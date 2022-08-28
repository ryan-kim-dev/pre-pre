const express = require('express');
const app = express();
const port = 5000;
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// 몽고디비 연결
const mongoose = require('mongoose');
// 몽고디비 환경변수 연결
const config = require('./config/keys');
// 정의한 Model 가져오기
const { User } = require('./models/User');
// 폴더를 분리해서 작성해둔 인증 처리하는 함수 가져오기
const { auth } = require('./middleware/auth');

// * 1. 미들웨어 사용 부분
// Client의 빌드된 정적파일 사용
app.use(express.static(path.join(__dirname, '../client/build')));

// CORS 허용
app.use(cors());

// 클라이언트의 요청 데이터 받아서 사용할수 있게 변환
// json은 말 그대로 JSON 형태의 데이터 전달을 의미 (application/json)
// urlencoded는 url 형식의 데이터 전달을 의미 (application/x-www-form-urlencoded)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// 토큰을 쿠키에 담기 위해 쿠키파서 사용. 참고: https://velog.io/@heony/cookie-parser
app.use(cookieParser());

// * 2. 응답 부분

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// * 2.1 회원가입 요청의 응답
app.post('/api/users/register', (req, res) => {
  // 회원가입시 클라이언트 단에서 입력된 정보를 가져와 데이터베이스에 저장한다.
  // req.body에 json 객체로 키-값 이 들어가있다.
  const user = new User(req.body); // 정의한 모델을 불러와 요청 안의 데이터로 새 인스턴스 생성
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
  // save: 몽고디비의 메서드 - 콜백함수로 에러, 저장된 데이터를 매개변수로 받는다.
  // userInfo = ( user = new User(req.body) )
});

// * 2.2 로그인 요청의 응답
// 1. 로그인 요청으로 온 이메일 주소가 데이터베이스에 존재하는지 확인한다.
// 2. 이메일 주소가 데이터베이스에 있다면 비밀번호의 일치 여부를 확인한다.
// 3. 이메일과 비밀번호가 모두 일치하면 토큰을 생성한다.
app.post('/api/users/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: '가입되지 않은 사용자입니다. 이메일 주소를 확인해주세요',
      });
    }
    // 요청된 이메일이 데이터베이스에 존재할 경우 비밀번호 일치 여부 확인.
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: '비밀번호가 틀렸습니다.',
        });
      }

      // 비밀번호가 일치하는 경우 - 토큰을 생성한다.
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        // 토큰을 저장하는 곳은 쿠키, 세션스토리지, 로컬스토리지 다양함. 여기서는 쿠키에 저장해본다.
        res
          .cookie('x_auth', user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

// * 2.3 인증페이지 요청 응답
// role이 1이면 관리자, 0이면 일반 유저인 경우로 한다.
app.get('/api/users/auth', auth, (req, res) => {
  // './middleware/auth.js'의 auth 함수에서 코드가 종료되면서 next() 호출하므로
  // 미들웨어를 실행시키고 다시 나머지 코드를 실행해서 응답을 보내줌.
  // 미들웨어에서 예외처리를 해두었기 때문에 next()후 여기로 돌아온다면
  // 인증이 성공한 경우이다.
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
    photoURL: req.user.photoURL,
  });
});

app.listen(port, () => {
  // useNewUrlParser, useUnifiedTopology, useFindAndModify, and useCreateIndex are no longer supported options. Mongoose 6 always behaves as if useNewUrlParser, useUnifiedTopology, and useCreateIndex are true, and useFindAndModify is false. Please remove these options from your code.
  mongoose
    .connect(config.mongoURI)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(`${err}`));
});
