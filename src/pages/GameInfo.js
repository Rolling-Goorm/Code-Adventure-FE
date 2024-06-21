import React, { useContext } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Main from '../components/Main';
import { AuthContext } from '../components/AuthContext';
import { Name } from '../styles/StartStyle';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

// Styled components for pixel design
const InfoContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 20px;
`;

const InfoCard = styled.div`
  width: 250px;
  height: 150px;
  background: #fff;
  border: 4px solid #000;
  box-shadow: 4px 4px 0px 0px #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
  z-index: 999;
  text-align: center;
`;

const InfoTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0;
`;

const InfoDescription = styled.p`
  font-size: 14px;
  margin: 5px 0;
`;

const StartButton = styled.button`
  width: 200px;
  height: 50px;
  background: #007bff;
  color: #fff;
  border: 4px solid #000;
  box-shadow: 4px 4px 0px 0px #000;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  margin: 20px auto;
  display: block;
  transition: transform 0.3s;
  &:hover {
    transform: translateY(-5px);
  }
`;

function Start(setIsLoggedIn) {
  const { user } = useContext(AuthContext); // AuthContext 사용
  const navigate = useNavigate();
  const handleClickStart = () => {
    navigate('/');
  };
  return (
    <Main.Wrapper>
      <Header isLoggedIn={user} setIsLoggedIn={setIsLoggedIn} />
      <Layout.PageContent hasCloudAnimation={true}>
        <Name>About Game</Name>
        <InfoContainer>
          <InfoCard>
            <InfoTitle>재미있는 알고리즘</InfoTitle>
            <InfoDescription>
              게임 형식으로 알고리즘 문제를 <br />
              재미있게 풀어보세요!
            </InfoDescription>
          </InfoCard>
          <InfoCard>
            <InfoTitle>간편한 이용</InfoTitle>
            <InfoDescription>
              직관적인 UI로 간편하게 <br />
              이용할 수 있습니다.
            </InfoDescription>
          </InfoCard>
          <InfoCard>
            <InfoTitle>경험치와 상점</InfoTitle>
            <InfoDescription>코인을 받아 상점을 이용해보세요!</InfoDescription>
          </InfoCard>
        </InfoContainer>
        <StartButton onClick={handleClickStart}>시작하기</StartButton>
      </Layout.PageContent>
    </Main.Wrapper>
  );
}

export default Start;
