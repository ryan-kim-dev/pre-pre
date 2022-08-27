const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 25,
  },
  email: {
    // trim: 이메일의 계정 아이디 부분에서 공백 제거
    // unique: 중복된 이메일 주소 사용 막기
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 6,
  },
  role: {
    // 어떤 유형의 사용자인지 숫자로 구분
    // 기본값을 일반 유저로
    type: Number,
    default: 0,
  },
  photoURL: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
