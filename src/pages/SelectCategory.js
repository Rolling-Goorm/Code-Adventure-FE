import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Api } from '../api/ApiClient.ts';
import Layout from '../components/Layout';
import PropTypes from 'prop-types';
import Main from '../components/Main';
import Header from '../components/Header';
import { Name, Strong } from '../styles/styled';
import AvatarImg from '../assets/avatar.png';
import sayImg from '../assets/say.png';
import Island from '../assets/island.png';

// Initialize the API client
const api = new Api();

// API에서 카테고리 데이터를 가져오는 함수
const fetchCategories = async (languageType) => {
  const response = await api.programmingLanguage.categoryList(languageType);
  return response.data;
};

// 스타일드 컴포넌트 애니메이션 설정
const bounce2 = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const CategoryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
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
  font-size: 14px; /* 텍스트 크기를 줄임 */
  position: relative;
  top: -10px;
`;

const TextWrapper = styled.div`
  justify-content: space-between;
  align-items: center;
  margin: 5px 0px 0px 50px;
  display: flex;
  flex: 1; /* 남은 공간을 차지하게 설정 */
`;

function SelectCategory({ isLoggedIn, setIsLoggedIn }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { languageType } = location.state || {};
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery(['categories', languageType], () =>
    fetchCategories(languageType),
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const getBackgroundPosition = (index) => {
    const positions = [
      'background-position: -60px 0;',
      'background-position: -270px 0;',
      'background-position: -480px 0;',
      'background-position: -680px 0;',
      'background-position: -800px 0;',
      'background-position: -1000px 0;',
      'background-position: -1200px 0;',
      'background-position: -1400px 0;',
    ];
    return positions[index % positions.length];
  };

  const handleCategoryClick = (categoryId) => {
    navigate('/selectStages', { state: { languageType, categoryId } });
  };

  return (
    <Main.Wrapper>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Layout.PageContent>
        <Name>
          <Strong>카테고리</Strong>를 선택해주세요
        </Name>
        <CategoryWrapper>
          {categories.map((category, index) => (
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
            <TextWrapper>풀고 싶은 카테고리를 선택해봐 !!</TextWrapper>
          </SpeechBubble>
        </SpeechBubbleWrapper>
      </Layout.PageContent>
    </Main.Wrapper>
  );
}

SelectCategory.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default SelectCategory;
