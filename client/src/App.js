import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const App = () => {
  const [answerLists, setAnswerLists] = useState([]);

  useEffect(() => {
    axios
      .get('/list')
      .then(res => {
        console.log(res);
        console.log(res.data);
        setAnswerLists(res.data);
      })
      .catch(err => console.log(`${err}`));
  }, [answerLists]);

  const [data, setData] = useState({
    name: '',
    title: '',
    message: '',
  });

  const onChange = e => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = e => {
    e.preventDefault();
    axios
      .post('/upload', data)
      .then(res => console.log(res.data))
      .catch(err => console.log(`${err}`));
  };

  return (
    <Container>
      <form action="/upload" onChange={onChange} onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">이름</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="이름을 입력하세요"
          />
        </div>
        <div>
          <label htmlFor="title">제목</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="제목을 입력하세요"
          />
        </div>
        <div>
          <label htmlFor="message">본문</label>
          <textarea
            id="message"
            name="message"
            type="text"
            placeholder="본문을 입력하세요"
          />
        </div>
        <div>
          <input type="submit" value="제출" />
        </div>
      </form>
      <Lists>
        {answerLists.map(item => {
          return (
            <ListItem>
              <div>{item.name}</div>
              <div>{item.title}</div>
              <div>{item.message}</div>
            </ListItem>
          );
        })}
      </Lists>
    </Container>
  );
};

export default App;

const Container = styled.div`
  width: 100%;
  height: max-content;
`;

const Lists = styled.div`
  width: 500px;
  height: 1000px;
  border: 1px solid black;
`;

const ListItem = styled.div``;
