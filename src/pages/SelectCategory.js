import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../components/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Layout from '../components/Layout';
import PropTypes from 'prop-types';
import Main from '../components/Main';
import Header from '../components/Header';
import { Name, Strong } from '../styles/styled';
import AvatarImg from '../assets/avatar.png';
import sayImg from '../assets/say.png';
import Island from '../assets/island.png';
import useFetch from '../hooks/useFetch'; // useFetch 훅을 import

const SelectCategory = ({ setIsLoggedIn }) => {
  const { user } = useContext(AuthContext); // AuthContext 사용
  const location = useLocation();
  const navigate = useNavigate();
  const { languageType, programmingLanguageId } = location.state || {};

  const [alertMessage, setAlertMessage] = useState(
    '풀고 싶은 카테고리를 선택해봐 !!',
  );

  useEffect(() => {
    if (!programmingLanguageId) {
      setAlertMessage('언어를 먼저 선택해주세요 !!');
    }
  }, [programmingLanguageId]);

  const { data: categories } = useFetch(
    programmingLanguageId
      ? `http://118.67.128.223:8080/programmingLanguage/${programmingLanguageId}/categories`
      : null,
  );

  const getBackgroundPosition = (index) => {
    const positions = [
      'background-position: -60px 0;',
      'background-position: -270px 0;',
      'background-position: -480px 0;',
      'background-position: -680px 0;',
      'background-position: -885px 0;',
      'background-position: -1100px 0;',
    ];
    return positions[index % positions.length];
  };

  const handleCategoryClick = (categoryId) => {
    console.log(`Selected Category ID: ${categoryId}`);
    navigate('/selectstages', {
      state: { languageType, categoryId, programmingLanguageId },
    }); // programmingLanguageId 추가
  };

  return (
    <Main.Wrapper>
      <Header isLoggedIn={!!user} setIsLoggedIn={setIsLoggedIn} />
      <Layout.PageContent>
        <Name>
          <Strong>카테고리</Strong>를 선택해주세요
        </Name>
        <CategoryWrapper>
          {categories &&
            categories.map((category, index) => (
              <CategoryBox
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                delay={index * 0.2}
              >
                <Progress>{category.progress || 0}%</Progress>
                <ImageBox backgroundPosition={getBackgroundPosition(index)} />
                <CategoryName>{category.name}</CategoryName>
              </CategoryBox>
            ))}
        </CategoryWrapper>
        <SpeechBubbleWrapper>
          <Avatar src={AvatarImg} alt="avatarImg" />
          <SpeechBubble>
            <TextWrapper>{alertMessage}</TextWrapper>
          </SpeechBubble>
        </SpeechBubbleWrapper>
      </Layout.PageContent>
    </Main.Wrapper>
  );
};

SelectCategory.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

// Styled-components for styling the category boxes
const bounce2 = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const scrollShake = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-2px);
  }
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px; /* 카테고리 박스 간의 간격 설정 */
  max-height: 500px; /* 원하는 높이로 설정 */
  overflow-y: auto; /* 세로 스크롤바 활성화 */
  padding-right: 10px; /* 스크롤바와 컨텐츠 사이에 여백 추가 */
  scrollbar-width: thin; /* 스크롤바 두께 설정 (Firefox) */
  scrollbar-color: #888 #e0e0e0; /* 스크롤바 색상 설정 (Firefox) */
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 30px;
  &::-webkit-scrollbar {
    width: 12px; /* 스크롤바 두께 설정 (Chrome, Safari) */
  }

  &::-webkit-scrollbar-track {
    background: #fff; /* 스크롤바 트랙 색상 설정 */
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #fff; /* 스크롤바 색상 설정 */
    border-radius: 10px;
    border: 3px solid #e0e0e0; /* 스크롤바와 트랙 사이의 간격 */
  }

  &:hover {
    animation: ${scrollShake} 0.5s infinite; /* 스크롤 시 흔들리는 효과 */
  }
`;

const CategoryBox = styled.div`
  width: 200px;
  height: 250px;
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
`;

const ImageBox = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 30px;
  background-color: #fff;
  filter: drop-shadow(0px 0px 5px white)
    drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.5));
  background-image: url('${Island}');
  background-size: 1400px 200px;
  background-repeat: no-repeat;
  &:hover {
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  }
  ${(props) => props.backgroundPosition}
`;

const CategoryName = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #000;
  text-shadow:
    -2px -2px 0 #fff,
    2px -2px 0 #fff,
    -2px 2px 0 #fff,
    2px 2px 0 #fff,
    -4px -4px 0 #fff,
    4px -4px 0 #fff,
    -4px 4px 0 #fff,
    4px 4px 0 #fff,
    -2px -2px 0 #000,
    2px -2px 0 #000,
    -2px 2px 0 #000,
    2px 2px 0 #000;
  z-index: 999999;
`;

const Progress = styled.div`
  font-size: 20px;
  text-shadow:
    1px 1px 0 #000,
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    2px -2px 0 #000,
    -2px 2px 0 #000;
  font-weight: bold;
  z-index: 999999;
  color: yellow;
`;

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
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
  animation: ${bounce} 1s infinite;
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.3));
`;

const SpeechBubble = styled.div`
  background-image: url(${sayImg});
  background-size: cover;
  background-repeat: no-repeat;
  padding: 10px 20px 10px 20px;
  margin-left: 10px;
  display: flex;
  align-items: center;
  width: 300px; /* 말풍선의 너비를 줄임 */
  height: 60px; /* 말풍선의 높이를 줄임 */
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

export default SelectCategory;
