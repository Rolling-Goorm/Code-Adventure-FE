import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  PageContent,
  Title,
  Input,
  Button,
  Spacer,
  InputWrapper,
  FormWrapper,
  RowWrapper,
} from '../styles/LoginStyle';
import Layout from '../components/Layout';
import Main from '../components/Main';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Signup() {
  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState('');
  const [birth, setBirth] = useState('');

  const navigate = useNavigate();

  const handleSignup = () => {
    if (loginPassword !== password2) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    const userData = {
      loginId,
      loginPassword,
      name,
      nickname,
      preferredLanguage,
      birth,
      email,
      phoneNumber,
    };

    fetch('http://118.67.128.223:8080/users/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.isSuccess === 'True') {
          alert('회원가입이 완료되었습니다!');
          navigate('/Signin');
        } else {
          alert('회원가입에 실패했습니다: ' + json.message);
        }
      })
      .catch((error) => {
        alert('회원가입 중 오류가 발생했습니다: ' + error.message);
      });
  };

  return (
    <Main.Wrapper>
      <Layout.PageContent>
        <PageContent>
          <Title>회원가입</Title>
          <FormWrapper>
            <RowWrapper>
              <InputWrapper>
                <Input
                  type="text"
                  placeholder="아이디"
                  value={loginId}
                  onChange={(event) => setLoginId(event.target.value)}
                />
                <Input
                  type="password"
                  placeholder="비밀번호"
                  value={loginPassword}
                  onChange={(event) => setLoginPassword(event.target.value)}
                />
              </InputWrapper>
              <InputWrapper>
                <Input
                  type="password"
                  placeholder="비밀번호 확인"
                  value={password2}
                  onChange={(event) => setPassword2(event.target.value)}
                />
                <Input
                  type="text"
                  placeholder="이메일"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </InputWrapper>
            </RowWrapper>
            <RowWrapper>
              <InputWrapper>
                <Input
                  type="text"
                  placeholder="전화번호"
                  value={phoneNumber}
                  onChange={(event) => setPhoneNumber(event.target.value)}
                />
                <Input
                  type="text"
                  placeholder="이름"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </InputWrapper>
              <InputWrapper>
                <Input
                  type="text"
                  placeholder="닉네임"
                  value={nickname}
                  onChange={(event) => setNickname(event.target.value)}
                />
                <Input
                  type="text"
                  placeholder="선호 언어"
                  value={preferredLanguage}
                  onChange={(event) => setPreferredLanguage(event.target.value)}
                />
              </InputWrapper>
            </RowWrapper>
            <InputWrapper>
              <Input
                type="date"
                placeholder="생일"
                value={birth}
                onChange={(event) => setBirth(event.target.value)}
              />
            </InputWrapper>
            <Button onClick={handleSignup}>회원가입</Button>
            <Spacer />
            <Link to="/Signin">
              <Button>Login</Button>
            </Link>
          </FormWrapper>
        </PageContent>
      </Layout.PageContent>
    </Main.Wrapper>
  );
}

Signup.propTypes = {
  setMode: PropTypes.func.isRequired,
};

export default Signup;
