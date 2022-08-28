import React from 'react';
import { Link } from 'react-router-dom';
function Navbar() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">로그인</Link>
        </li>
        <li>
          <Link to="/register">회원가입</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
