import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Main from '../components/Main';
import { Name } from '../styles/styled';
import { UserInfoItem, Button } from '../styles/LoginStyle';
import { AuthContext } from '../components/AuthContext';

function Mypages(props) {
  const [userInfo, setUserInfo] = useState(null);
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

  const { user } = useContext(AuthContext); // AuthContext에서 사용자 정보 가져오기
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.id) {
      fetch(`http://118.67.128.223:8080/users/${user.id}`)
        .then((res) => res.json())
        .then((json) => {
          console.log('User info fetched:', json); // 유저 정보 콘솔 출력
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
    fetch(`http://localhost:8080/users/${userInfo.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editInfo),
    })
      .then((res) => res.json())
      .then((updatedInfo) => {
        setUserInfo(updatedInfo);
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
        <UserInfoItem>아이디: {userInfo.loginId}</UserInfoItem>
        <UserInfoItem>이름: {userInfo.name}</UserInfoItem>
        <UserInfoItem>닉네임: {userInfo.nickname}</UserInfoItem>
        <UserInfoItem>선호 언어 : {userInfo.preferredLanguage}</UserInfoItem>
        <UserInfoItem>생일 : {userInfo.birth}</UserInfoItem>
        <UserInfoItem>이메일 : {userInfo.email}</UserInfoItem>
        <UserInfoItem>전화번호 : {userInfo.phoneNumber}</UserInfoItem>
        <Button onClick={handleSave}>저장</Button>
        <Button onClick={() => navigate('/')}>메인으로 돌아가기</Button>
      </Layout.PageContent>
    </Main.Wrapper>
  );
}

export default Mypages;
