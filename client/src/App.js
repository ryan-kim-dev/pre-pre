import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const App = () => {
  const [answerLists, setAnswerLists] = useState([]);
  const [data, setData] = useState({
    name: '',
    title: '',
    message: '',
  });

  // * get 요청 변수화 - post 요청하는 onSubmit 함수에서 post 요청 후 호출해서 화면에 db 반영 최신화시킴
  const getData = async () => {
    const response = await axios.get('/save');
    setAnswerLists(response.data);
  };

  useEffect(() => {
    axios
      .get('/list')
      .then(res => {
        console.log(res);
        console.log(res.data);
        setAnswerLists(res.data);
      })
      .catch(err => console.log(`${err}`));
  }, []);

  const onChange = e => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async e => {
    e.preventDefault();
    console.log(data);
    await axios.post('/save', data);
    getData(); // 오늘 테스트 시 지워야 할 수도 - get요청 응답 뺐으므로
  };

  return (
    <Container>
      <form onChange={onChange} onSubmit={onSubmit}>
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
        {answerLists?.map(item => {
          return (
            <ListItem>
              <div>{item.name}</div>
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
