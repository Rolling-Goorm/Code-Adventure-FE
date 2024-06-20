import React, { useState } from 'react';
import {
  Title,
  ErrorMessage,
  Input,
  Button,
  Spacer,
} from '../styles/LoginStyle';
import Layout from '../components/Layout';
import Main from '../components/Main';
import { Link } from 'react-router-dom';

const Signin = () => {
  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [error, setError] = useState('');

  // 로그인 핸들러 함수
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginId || !loginPassword) {
      setError('Both fields are required');
    } else {
      try {
        const response = await fetch('http://118.67.128.223:8080/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ loginId, loginPassword }),
        });

        if (!response.ok) {
          throw new Error('Login failed');
        }

        const data = await response.json();
        console.log('Login successful', data);
        setError('');
      } catch (error) {
        console.error('Error:', error);
        setError('Login failed');
      }
    }
  };

  return (
    <Main.Wrapper>
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
