import React, { useState } from 'react';

const Signin = () => {
  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginId || !loginPassword) {
      setError('Both fields are required');
    } else {
      setError('');
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
        계정이 없으신가요?{' '}
        <Button
          type="button"
          onClick={() => (window.location.href = '/SIGNIN')}
        >
          회원가입
        </Button>
      </Layout.PageContent>
    </Main.Wrapper>
  );
};

export default Signin;
