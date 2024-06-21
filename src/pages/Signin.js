import React, { useState, useContext } from 'react';
import {
  Title,
  ErrorMessage,
  Input,
  Button,
  Spacer,
} from '../styles/LoginStyle';
import Layout from '../components/Layout';
import Main from '../components/Main';
import Header from '../components/Header';
import { AuthContext } from '../components/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Signin = (setIsLoggedIn) => {
  const { user } = useContext(AuthContext);
  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext); // AuthContext 사용
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginId || !loginPassword) {
      setError('Both fields are required');
    } else {
      try {
        console.log('Sending login request:', { loginId, loginPassword });
        const response = await fetch('http://118.67.128.223:8080/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ loginId, loginPassword }),
        });

        console.log('Received response:', response);
        if (!response.ok) {
          throw new Error('Login failed');
        }

        const data = await response.text(); // 응답을 텍스트로 받음
        console.log('Login successful', data);

        // JSON 파싱 시도
        try {
          const jsonData = JSON.parse(data);
          console.log('Parsed JSON:', jsonData);
          // JSON 데이터에 따라 후속 처리
          login(jsonData); // 로그인 정보를 AuthContext에 저장
        } catch (parseError) {
          console.log('Response is not JSON. Using plain text data.');
          // 로그인 정보를 적절히 설정 (여기서는 응답이 JSON이 아니므로 예시로 간단히 처리)
          login({ loginId });
        }

        setError('');
        navigate('/selectLanguage'); // 로그인 성공 시 페이지 이동
      } catch (error) {
        console.error('Error:', error);
        setError('Login failed');
      }
    }
  };

  return (
    <Main.Wrapper>
      <Header isLoggedIn={user} setIsLoggedIn={setIsLoggedIn} />
      <Layout.PageContent>
        <Title>Login</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={handleLogin}>
          <Input
            type="text"
            placeholder="User ID"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <Button type="submit">Login</Button>
        </form>
        <Spacer />
        계정이 없으신가요? <Link to="/Signup">회원가입</Link>
      </Layout.PageContent>
    </Main.Wrapper>
  );
};

export default Signin;
