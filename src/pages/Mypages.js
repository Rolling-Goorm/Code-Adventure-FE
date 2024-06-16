import React from 'react';
import Layout from '../components/Layout';
import Main from '../components/Main';
import { Name } from '../components/styled';


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
        phoneNumber: ''
    });

    useEffect(() => {
        fetch("http://localhost:8080/users/{userid}")
            .then((res) => res.json())
            .then((json) => {
                setUserInfo(json);
                setEditInfo({
                    loginId: json.username,
                    loginPassword: '',
                    name: json.name,
                    nickname: json.nickname,
                    preferredLanguage: json.preferredLanguage,
                    birth: json.birth,
                    email: json.email,
                    phoneNumber: json.phone
                });
            });
    }, []);
    const handleChange = (e) => {
        setEditInfo({
            ...editInfo,
            [e.target.name]: e.target.value
        });
    };
    const handleSave = () => {
        fetch(`http://localhost:8080/users/${userInfo.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editInfo)
        })
            .then(res => res.json())
            .then(updatedInfo => {
                setUserInfo(updatedInfo);
                alert('User info updated successfully');
            })
            .catch(error => {
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
      </Layout.PageContent>
      <Button onClick="/">메인으로 돌아가기</Button>
    </Main.Wrapper>
  );
}

export default Mypages;
