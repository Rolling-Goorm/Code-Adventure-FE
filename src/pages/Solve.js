import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Main from '../components/Main';
import Header from '../components/Header';
import { Name } from '../styles/styled';

function Solve({ isLoggedIn, setIsLoggedIn, cntLife, setCntLife }) {
  const [code, setCode] = useState('');
  const [runtime, setRuntime] = useState('4385ms');
  const [compiledError, setCompiledError] = useState('syntax error');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // 여기서 서버에 요청을 보내고, 응답을 처리합니다.
    const response = await fetch('/api/submit', {
      method: 'POST',
      body: JSON.stringify({ code }),
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.json();
    const { correct } = result;

    if (correct) {
      navigate('/correctAnswer');
    } else {
      setCntLife((prevLife) => prevLife - 1);
      navigate('/wrongAnswer');
    }
  };

  return (
    <Main.Wrapper>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Layout.PageContent>
        <Name>문제를 풀고 제출하세요</Name>
        <textarea value={code} onChange={(e) => setCode(e.target.value)} />
        <button onClick={handleSubmit}>제출</button>
        <div>
          <p>남은 목숨: {cntLife}</p>
          <p>런타임: {runtime}</p>
          <p>컴파일 에러: {compiledError}</p>
        </div>
      </Layout.PageContent>
    </Main.Wrapper>
  );
}

Solve.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
  cntLife: PropTypes.number.isRequired,
  setCntLife: PropTypes.func.isRequired,
};

export default Solve;
