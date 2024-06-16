import React, { useState } from 'react';
import {
  StartContainer,
  LoginContainer,
  LoginForm,
  Title,
  Input,
  Button,
  SignupPrompt,
} from '../style/LoginStyle';
import background from '../img/background.png';

function Signin(props) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState('');
  const [birth, setBirth] = useState('');

  return (
    <Main.Wrapper>
      <Layout.PageContent>
        <Title>회원가입</Title>
        <Input
          type="text"
          placeholder="아이디"
          onChange={(event) => setId(event.target.value)}
        />
        <Input
          type="password"
          placeholder="비밀번호"
          onChange={(event) => setPassword(event.target.value)}
        />
        <Input
          type="password"
          placeholder="비밀번호 확인"
          onChange={(event) => setPassword2(event.target.value)}
        />
        <Input
          type="text"
          placeholder="이메일"
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input
          type="text"
          placeholder="전화번호"
          onChange={(event) => setPhone(event.target.value)}
        />
        <Input
          type="text"
          placeholder="이름"
          onChange={(event) => setName(event.target.value)}
        />
        <Input
          type="text"
          placeholder="닉네임"
          onChange={(event) => setNickname(event.target.value)}
        />
        <Input
          type="text"
          placeholder="선호 언어"
          onChange={(event) => setPreferredLanguage(event.target.value)}
        />
        <Input
          type="date"
          placeholder="생일"
          onChange={(event) => setBirth(event.target.value)}
        />
        <Button
          onClick={() => {
            const userData = {
              userId: id,
              userPassword: password,
              userPassword2: password2,
              email: email,
              phone: phone,
              name: name,
              nickname: nickname,
              preferredLanguage: preferredLanguage,
              birth: birth,
            };
            fetch('http://localhost:3001/signin', {
              method: 'post',
              headers: {
                'content-type': 'application/json',
              },
              body: JSON.stringify(userData),
            })
              .then((res) => res.json())
              .then((json) => {
                if (json.isSuccess === 'True') {
                  alert('회원가입이 완료되었습니다!');
                  props.setMode('LOGIN');
                } else {
                  alert(json.isSuccess);
                }
              });
          }}
        >
          회원가입
        </Button>
        로그인화면으로 돌아가기
        <Button onClick={() => props.setMode('/login')}>로그인</Button>
      </Layout.PageContent>
    </Main.Wrapper>
  );
}

export default Signin;
