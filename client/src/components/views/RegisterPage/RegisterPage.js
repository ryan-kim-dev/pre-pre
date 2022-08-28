import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { newUser } from '../../../redux/actions';

function RegisterPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInfo, setuserInfo] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  });

  const onChange = e => {
    const { name, value } = e.target;
    setuserInfo(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async e => {
    e.preventDefault();

    if (userInfo.password !== userInfo.confirmPassword) {
      return alert('비밀번호와 비밀번호 확인 입력이 다릅니다.');
    }
    const res = await dispatch(newUser(userInfo));
    // 회원가입 성공 - 홈으로 리다이렉트
    if (res.payload.success === true) return navigate('/login');
    // 회원가입 실패
    return console.log(`회원 가입 실패. 회원가입 상태: ${res.payload.success}`);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={onSubmit}
        onChange={onChange}
      >
        <label>Email</label>
        <input type="email" name="email" />

        <label>Name</label>
        <input type="text" name="name" />

        <label>Password</label>
        <input type="password" name="password" />

        <label>Confirm Password</label>
        <input type="password" name="confirmPassword" />

        <br />
        <button type="submit">회원 가입</button>
      </form>
    </div>
  );
}

export default RegisterPage;
