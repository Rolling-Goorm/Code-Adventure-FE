import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Main from '../components/Main';
import { Name } from '../styles/styled';
import { UserInfoItem, Button, Input } from '../styles/LoginStyle'; // Import Input and Button for styling
import { AuthContext } from '../components/AuthContext';

function Mypages() {
  const [userInfo, setUserInfo] = useState(null);
  const [editMode, setEditMode] = useState(false); // State to toggle edit mode
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
      <Layout.PageContent>
        <Name>마이페이지</Name>
        {editMode ? (
          <>
            <UserInfoItem>아이디</UserInfoItem>
            <Input
              type="text"
              name="loginId"
              value={editInfo.loginId}
              onChange={handleChange}
            />
            <UserInfoItem>비밀번호</UserInfoItem>
            <Input
              type="password"
              name="loginPassword"
              value={editInfo.loginPassword}
              onChange={handleChange}
            />
            <UserInfoItem>이름</UserInfoItem>
            <Input
              type="text"
              name="name"
              value={editInfo.name}
              onChange={handleChange}
            />
            <UserInfoItem>닉네임</UserInfoItem>
            <Input
              type="text"
              name="nickname"
              value={editInfo.nickname}
              onChange={handleChange}
            />
            <UserInfoItem>선호 언어</UserInfoItem>
            <Input
              type="text"
              name="preferredLanguage"
              value={editInfo.preferredLanguage}
              onChange={handleChange}
            />
            <UserInfoItem>생일</UserInfoItem>
            <Input
              type="date"
              name="birth"
              value={editInfo.birth}
              onChange={handleChange}
            />
            <UserInfoItem>이메일</UserInfoItem>
            <Input
              type="email"
              name="email"
              value={editInfo.email}
              onChange={handleChange}
            />
            <UserInfoItem>전화번호</UserInfoItem>
            <Input
              type="tel"
              name="phoneNumber"
              value={editInfo.phoneNumber}
              onChange={handleChange}
            />
            <Button onClick={handleSave}>저장</Button>
            <Button onClick={() => setEditMode(false)}>취소</Button>
          </>
        ) : (
          <>
            <UserInfoItem>아이디: {userInfo.loginId}</UserInfoItem>
            <UserInfoItem>이름: {userInfo.name}</UserInfoItem>
            <UserInfoItem>닉네임: {userInfo.nickname}</UserInfoItem>
            <UserInfoItem>선호 언어: {userInfo.preferredLanguage}</UserInfoItem>
            <UserInfoItem>생일: {userInfo.birth}</UserInfoItem>
            <UserInfoItem>이메일: {userInfo.email}</UserInfoItem>
            <UserInfoItem>전화번호: {userInfo.phoneNumber}</UserInfoItem>
            <Button onClick={() => setEditMode(true)}>수정</Button>
            <Button onClick={() => navigate('/')}>메인으로 돌아가기</Button>
          </>
        )}
      </Layout.PageContent>
    </Main.Wrapper>
  );
}

export default Mypages;
