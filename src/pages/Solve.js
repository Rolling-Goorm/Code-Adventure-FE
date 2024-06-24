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
  padding-left: ${({ isOpen }) => (isOpen ? '20px' : '0')}; /* 왼쪽 여백 추가 */
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
  const [runtime, setRuntime] = useState('');
  const [compiledError, setCompiledError] = useState('');
  const [rewardCoin, setRewardCoin] = useState(0);
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const correctCode = `
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // 사용자로부터 이름과 나이를 입력받음
        System.out.print("이름을 입력하세요: ");
        String name = scanner.nextLine();

        System.out.print("나이를 입력하세요: ");
        int age = scanner.nextInt();

        // 입력받은 이름과 나이를 이용해 출력
        System.out.println("제 이름은 " + name + "이고, 나이는 " + age + "살 입니다.");
        
        scanner.close();
    }
}`;

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async () => {
    try {
      console.log('Submitting code:', code); // 디버그: 제출한 코드 출력
      const response = await fetch('http://118.67.128.223:8080/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });
      const data = await response.json();
      console.log('Received response:', data); // 디버그: 서버 응답 출력

      setCntLife(data.remainingLife);
      setRuntime(data.runtime);
      setCompiledError(data.syntaxError);
      setRewardCoin(data.rewardCoin);
      setMessage(data.message);

      if (code.trim() === correctCode.trim() && data.success) {
        navigate('/correctAnswer', {
          state: { cntLife, rewardCoin: cntLife * 10 },
        });
      } else {
        alert(`런타임: ${data.runtime}\n컴파일 에러: ${data.syntaxError}`);
        if (data.remainingLife <= 0) {
          navigate('/wrongAnswer');
        }
      }
    } catch (error) {
      console.error('Error:', error);
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
                <Title>입출력하기</Title>
                <p>
                  이름, 나이를 입력하면 다음과 같이 출력되도록 코드를
                  작성해보세요.
                </p>
                <p>입력 : 홍길동 24</p>
                <p>출력 : 제 이름은 홍길동이고, 나이는 24살 입니다.</p>
              </ProblemContainer>
              <SolutionContainer>
                <TextArea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <button onClick={handleSubmit}>제출</button>
                <div>
                  <p>{message}</p>
                </div>
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
