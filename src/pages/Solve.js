import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { Title } from '../styles/LoginStyle';
import Layout from '../components/Layout';
import Main from '../components/Main';
import Header from '../components/Header';
import heartImg from '../assets/heart.png';

const slideIn = keyframes`
  from {
    width: 50px;
  }
  to {
    width: 200px;
  }
`;

const slideOut = keyframes`
  from {
    width: 200px;
  }
  to {
    width: 50px;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 40px);
  height: 80%;
  max-width: 2000px;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.8);
  position: relative;
  padding-top: 50px; /* 추가: heartsContainer와 겹치지 않도록 패딩 추가 */
`;

const NavigationBarWrapper = styled.div`
  position: relative;
  min-width: ${({ isOpen }) =>
    isOpen ? '200px' : '50px'}; /* 최소 너비 조정 */
  width: ${({ isOpen }) => (isOpen ? '200px' : '50px')}; /* 최소 너비 조정 */
  animation: ${({ isOpen }) => (isOpen ? slideIn : slideOut)} 0.3s forwards;
  border-right: 1px solid #ccc;
  background: #f9f9f9;
  overflow: hidden;
  transition: width 0.3s ease; /* 애니메이션 추가 */
`;

const NavigationToggle = styled.div`
  position: absolute;
  top: 10px;
  left: ${({ isOpen }) => (isOpen ? '170px' : '10px')};
  cursor: pointer;
  transition: left 0.3s ease; /* 애니메이션 추가 */
`;

const NavigationBar = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: ${({ isOpen }) => (isOpen ? 'flex-start' : 'center')};
`;

const NavigationItem = styled.div`
  cursor: pointer;
  margin: 10px 0;
  display: flex;
  align-items: center;
`;

const ProblemContainer = styled.div`
  flex: 2;
  min-width: 400px; /* 최소 너비 조정 */
  padding: 20px;
  border-right: 1px solid #ccc;
`;

const SolutionContainer = styled.div`
  flex: 3;
  min-width: 400px; /* 최소 너비 조정 */
  padding: 20px;
`;

const TextArea = styled.textarea`
  width: 90%;
  height: 300px;
  margin-top: 20px; /* 추가: 텍스트 영역을 아래로 내리기 위한 마진 추가 */
`;

const HeartsContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 20px;
  display: flex;
`;

const Heart = styled.img`
  width: 30px;
  height: 30px;
  margin-left: 5px;
`;

function Solve({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { stageId, cntLife: initialCntLife } = location.state || {};
  const [code, setCode] = useState('');
  const [cntLife, setCntLife] = useState(initialCntLife);
  const [runtime, setRuntime] = useState('4385ms');
  const [compiledError, setCompiledError] = useState('syntax error');
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async () => {
    const response = await fetch('/api/submit', {
      method: 'POST',
      body: JSON.stringify({ code }),
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.json();
    const { correct } = result;

    if (correct) {
      navigate('/correctAnswer', { state: { cntLife } });
    } else {
      if (cntLife - 1 <= 0) {
        navigate('/wrongAnswer');
      } else {
        setCntLife((prevLife) => prevLife - 1);
      }
    }
  };

  return (
    <Main.Wrapper>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Layout.PageContent>
        <Container>
          <ContentWrapper>
            <HeartsContainer>
              {Array.from({ length: cntLife }).map((_, index) => (
                <Heart key={index} src={heartImg} alt="heart" />
              ))}
            </HeartsContainer>
            <div style={{ display: 'flex', flex: 1 }}>
              <NavigationBarWrapper isOpen={isOpen}>
                <NavigationToggle isOpen={isOpen} onClick={handleToggle}>
                  {isOpen ? '<' : '>'}
                </NavigationToggle>
                <NavigationBar isOpen={isOpen}>
                  {[1, 2, 3].map((item) => (
                    <NavigationItem key={item} isOpen={isOpen}>
                      {item}{' '}
                      {isOpen &&
                        (item === 1
                          ? '입출력하기'
                          : item === 2
                            ? '덧셈뺄셈'
                            : '계산기만들기')}
                    </NavigationItem>
                  ))}
                </NavigationBar>
              </NavigationBarWrapper>
              <ProblemContainer>
                <Title>사칙연산</Title>
                <p>문제 설명...</p>
              </ProblemContainer>
              <SolutionContainer>
                <TextArea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <button onClick={handleSubmit}>제출</button>
              </SolutionContainer>
            </div>
          </ContentWrapper>
        </Container>
      </Layout.PageContent>
    </Main.Wrapper>
  );
}

Solve.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default Solve;
