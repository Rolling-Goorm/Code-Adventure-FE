import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Layout from '../components/Layout';
import Main from '../components/Main';
import Header from '../components/Header';
import { Name } from '../styles/styled';
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
  width: calc(100% - 40px);
  max-width: 1200px;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.9);
`;

const NavigationBarWrapper = styled.div`
  position: relative;
  width: ${({ isOpen }) => (isOpen ? '200px' : '50px')};
  animation: ${({ isOpen }) => (isOpen ? slideIn : slideOut)} 0.3s forwards;
  border-right: 1px solid #ccc;
  background: #f9f9f9;
  overflow: hidden;
`;

const NavigationToggle = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  cursor: pointer;
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
  padding: 20px;
  border-right: 1px solid #ccc;
`;

const SolutionContainer = styled.div`
  flex: 3;
  padding: 20px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 300px;
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
      <HeartsContainer>
        {Array.from({ length: cntLife }).map((_, index) => (
          <Heart key={index} src={heartImg} alt="heart" />
        ))}
      </HeartsContainer>
      <Layout.PageContent>
        <Container>
          <ContentWrapper>
            <NavigationBarWrapper isOpen={isOpen}>
              <NavigationToggle onClick={handleToggle}>
                {isOpen ? '<' : '...'}
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
              <Name>문제를 풀고 제출하세요</Name>
              <p>문제 설명...</p>
            </ProblemContainer>
            <SolutionContainer>
              <TextArea
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <button onClick={handleSubmit}>제출</button>
            </SolutionContainer>
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
