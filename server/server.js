const express = require('express');
const app = express();
const port = 5000;
const path = require('path');
const cors = require('cors');
// 몽고디비 연결
const mongoose = require('mongoose');
// 몽고디비 환경변수 연결
const config = require('./config/keys');
// 정의한 Model 가져오기
const { User } = require('./models/User');

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

// * 2. 응답 부분

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.post('/register', (req, res) => {
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

app.listen(port, () => {
  // useNewUrlParser, useUnifiedTopology, useFindAndModify, and useCreateIndex are no longer supported options. Mongoose 6 always behaves as if useNewUrlParser, useUnifiedTopology, and useCreateIndex are true, and useFindAndModify is false. Please remove these options from your code.
  mongoose
    .connect(config.mongoURI)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(`${err}`));
});
