import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Main from '../components/Main';
import { Name } from '../styles/styled';
import {
  UserInfoItem,
  Button,
  FormWrapper,
  Input,
  PageContent,
} from '../styles/LoginStyle';
import { AuthContext } from '../components/AuthContext';
import Header from '../components/Header';

const StyledPageContent = styled(PageContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 40px auto;
`;

const StyledUserInfoItem = styled(UserInfoItem)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  font-size: 16px;
  color: #333;
`;

function Mypages() {
  const [userInfo, setUserInfo] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editInfo, setEditInfo] = useState({
    loginId: '',
    loginPassword: '',
    name: '',
    nickname: '',
    preferredLanguage: '',
    birth: '',
    email: '',
    phoneNumber: '',
  });

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.id) {
      fetch(`http://118.67.128.223:8080/users/${user.id}`)
        .then((res) => res.json())
        .then((json) => {
          console.log('User info fetched:', json);
          setUserInfo(json);
          setEditInfo({
            loginId: json.username,
            loginPassword: '',
            name: json.name,
            nickname: json.nickname,
            preferredLanguage: json.preferredLanguage,
            birth: json.birth,
            email: json.email,
            phoneNumber: json.phone,
          });
        })
        .catch((error) => {
          console.error('Error fetching user info:', error);
        });
    }
  }, [user]);

  const handleChange = (e) => {
    setEditInfo({
      ...editInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    fetch(`http://118.67.128.223:8080/users/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editInfo),
    })
      .then((res) => res.json())
      .then((updatedInfo) => {
        setUserInfo(updatedInfo);
        setEditMode(false);
        alert('User info updated successfully');
      })
      .catch((error) => {
        console.error('Error updating user info:', error);
        alert('Failed to update user info');
      });
  };

  if (!userInfo) {
    return <div>로딩 중...</div>;
  }

  return (
    <Main.Wrapper>
      <Header isLoggedIn={user} />
      <Layout.PageContent>
        <Name>마이페이지</Name>
        <StyledPageContent>
          <FormWrapper>
            {editMode ? (
              <>
                <StyledUserInfoItem>
                  아이디
                  <Input
                    type="text"
                    name="loginId"
                    value={editInfo.loginId}
                    onChange={handleChange}
                  />
                </StyledUserInfoItem>
                <StyledUserInfoItem>
                  비밀번호
                  <Input
                    type="password"
                    name="loginPassword"
                    value={editInfo.loginPassword}
                    onChange={handleChange}
                  />
                </StyledUserInfoItem>
                <StyledUserInfoItem>
                  이름
                  <Input
                    type="text"
                    name="name"
                    value={editInfo.name}
                    onChange={handleChange}
                  />
                </StyledUserInfoItem>
                <StyledUserInfoItem>
                  닉네임
                  <Input
                    type="text"
                    name="nickname"
                    value={editInfo.nickname}
                    onChange={handleChange}
                  />
                </StyledUserInfoItem>
                <StyledUserInfoItem>
                  선호 언어
                  <Input
                    type="text"
                    name="preferredLanguage"
                    value={editInfo.preferredLanguage}
                    onChange={handleChange}
                  />
                </StyledUserInfoItem>
                <StyledUserInfoItem>
                  생일
                  <Input
                    type="date"
                    name="birth"
                    value={editInfo.birth}
                    onChange={handleChange}
                  />
                </StyledUserInfoItem>
                <StyledUserInfoItem>
                  이메일
                  <Input
                    type="email"
                    name="email"
                    value={editInfo.email}
                    onChange={handleChange}
                  />
                </StyledUserInfoItem>
                <StyledUserInfoItem>
                  전화번호
                  <Input
                    type="tel"
                    name="phoneNumber"
                    value={editInfo.phoneNumber}
                    onChange={handleChange}
                  />
                </StyledUserInfoItem>

                <Button onClick={handleSave}>저장</Button>
                <Button onClick={() => setEditMode(false)}>취소</Button>
              </>
            ) : (
              <>
                <StyledUserInfoItem>
                  아이디: {userInfo.loginId}
                </StyledUserInfoItem>
                <StyledUserInfoItem>이름: {userInfo.name}</StyledUserInfoItem>
                <StyledUserInfoItem>
                  닉네임: {userInfo.nickname}
                </StyledUserInfoItem>
                <StyledUserInfoItem>
                  선호 언어: {userInfo.preferredLanguage}
                </StyledUserInfoItem>
                <StyledUserInfoItem>생일: {userInfo.birth}</StyledUserInfoItem>
                <StyledUserInfoItem>
                  이메일: {userInfo.email}
                </StyledUserInfoItem>
                <StyledUserInfoItem>
                  전화번호: {userInfo.phoneNumber}
                </StyledUserInfoItem>

                <Button onClick={() => setEditMode(true)}>수정</Button>
                <Button onClick={() => navigate('/')}>메인으로 돌아가기</Button>
              </>
            )}
          </FormWrapper>
        </StyledPageContent>
      </Layout.PageContent>
    </Main.Wrapper>
  );
}

export default Mypages;
