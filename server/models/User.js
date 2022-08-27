const mongoose = require('mongoose');
// 비밀번호 암호화 - 참조: https://juni-official.tistory.com/161
const bcrypt = require('bcrypt');
const saltRounds = 10; // salt를 이용해서 비밀번호를 암호화 - 10자리로

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

// * 비밀번호 암호화하기 - bcrypt 사용
// pre: 몽고디비 내장 메서드 - server.js의 save 메서드에서 요청 데이터를 저장하기 전에
// 콜백함수를 실행하고 나서 다음 코드 실행
userSchema.pre('save', function (next) {
  const user = this;

  // 조건문: 비밀번호를 변경한 경우에만 비밀번호 해싱. 이름, 이메일 변경 시 아래 코드 실행 x
  if (user.isModified('password')) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash; // 평문으로 받은 비밀번호를 해싱해서 저장함.
        next();
      });
    });
  }
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
