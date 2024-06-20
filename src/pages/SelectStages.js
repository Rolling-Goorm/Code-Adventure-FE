import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { fetchStages } from '../api/api';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import PropTypes from 'prop-types';
import Main from '../components/Main';
import Layout from '../components/Layout';
import Header from '../components/Header';
import { Name, Strong } from '../styles/styled';
import lockImg from '../assets/lock.png';
import unlockImg from '../assets/unlock.png';
import avatarImg from '../assets/avatar.png';
import sayImg from '../assets/say.png';

const mockStagesData = [
  { id: 1, level: 'Easy', attemptResult: '성공' },
  { id: 2, level: 'Easy', attemptResult: '성공' },
  { id: 3, level: 'Easy', attemptResult: '실패' },
  { id: 4, level: 'Easy', attemptResult: '미시도' },
];

const bounce2 = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const StageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const StageBox = styled.div`
  width: 200px;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin: 10px;
  padding: 10px;
  cursor: pointer;
  animation: ${bounce2} 1s ease-in-out infinite;
  animation-delay: ${(props) => props.delay}s;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  &:hover {
    transform: translateY(-5px);
  }
  border: 1px solid #ccc;
  border-radius: 10px;
  background: #fff;
`;

const StageLevel = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const AttemptResult = styled.div`
  margin-top: 10px;
  font-size: 18px;
  color: ${(props) =>
    props.success ? 'green' : props.failed ? 'red' : 'gray'};
`;

const SpeechBubbleWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: 25px;
  position: relative;
`;

const Avatar = styled.img`
  width: 90px;
  height: 90px;
  animation: ${bounce2} 1s infinite;
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.3));
`;

const SpeechBubble = styled.div`
  background-image: url(${sayImg});
  background-size: cover;
  background-repeat: no-repeat;
  padding: 10px 20px;
  margin-left: 10px;
  display: flex;
  align-items: center;
  width: 300px;
  height: 60px;
  text-align: center;
  font-size: 14px;
  position: relative;
  top: -10px;
`;

const TextWrapper = styled.div`
  justify-content: space-between;
  align-items: center;
  margin: 5px 0px 0px 50px;
  display: flex;
  flex: 1;
`;

function SelectStages({ isLoggedIn, setIsLoggedIn }) {
  const location = useLocation();
  const { languageType, categoryId } = location.state || {};
  const {
    data: stages,
    isLoading,
    error,
  } = useQuery(['stages', languageType, categoryId], () =>
    fetchStages(languageType, categoryId),
  );
  const [lockedMessage, setLockedMessage] = useState('');

  const handleStageClick = (stageId, attemptResult) => {
    if (attemptResult === '미시도') {
      setLockedMessage(
        `현재 풀이해야할 단계는 ${stageId - 1}입니다. 이 단계를 성공하셔야 합니다!`,
      );
    } else {
      setLockedMessage('');
      // Add your stage handling logic here
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <Main.Wrapper>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Layout.PageContent>
        <Name>
          문제를 <Strong>단계</Strong>별로 풀이해주세요
        </Name>
        <StageWrapper>
          {stages.map((stage, index) => (
            <StageBox
              key={stage.id}
              delay={index * 0.2}
              onClick={() => handleStageClick(stage.id, stage.attemptResult)}
            >
              <StageLevel>{stage.level}</StageLevel>
              <img
                src={
                  stage.attemptResult === '성공' ||
                  stage.attemptResult === '실패'
                    ? unlockImg
                    : lockImg
                }
                alt={
                  stage.attemptResult === '성공' ||
                  stage.attemptResult === '실패'
                    ? 'Unlocked'
                    : 'Locked'
                }
                width="70"
                height="80"
              />
              <AttemptResult
                success={stage.attemptResult === '성공'}
                failed={stage.attemptResult === '실패'}
              >
                {stage.attemptResult}
              </AttemptResult>
            </StageBox>
          ))}
        </StageWrapper>
        {lockedMessage && (
          <SpeechBubbleWrapper>
            <Avatar src={avatarImg} alt="avatarImg" />
            <SpeechBubble>
              <TextWrapper>{lockedMessage}</TextWrapper>
            </SpeechBubble>
          </SpeechBubbleWrapper>
        )}
      </Layout.PageContent>
    </Main.Wrapper>
  );
}

SelectStages.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default SelectStages;
