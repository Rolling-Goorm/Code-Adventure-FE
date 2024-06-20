import styled, { keyframes, css } from 'styled-components';
import background from '../assets/background.png';
import cloudImage from '../assets/cloud.png';
import backAvatar from '../assets/BackAvatar.png';

// 구름 애니메이션 설정
const moveClouds = keyframes`
  0%, 100% { background-position: 0 0; }
  50% { background-position: -2000px 0; }
`;

const PageContent = styled.div`
  position: relative;
  box-shadow: 0px -6px 15px 5px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 60px 60px 0px 0px;
  padding: 10px 30px 0px 30px;
  background-image: url(${background});
  background-size: cover;
  background-position: center;
  width: 70%;
  height: 650px;

  ${({ hasCloudAnimation }) =>
    hasCloudAnimation &&
    css`
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url(${cloudImage}) repeat-x;
        animation: ${moveClouds} 60s linear infinite;
        z-index: 0;
        border-radius: 60px 60px 0px 0px;
      }
      &::after {
        content: '';
        position: absolute;
        bottom: 5;
        left: 0;
        width: 100%;
        height: 500px;
        background: url(${backAvatar}) no-repeat center bottom;
        background-size: 100%;
        filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1));
        z-index: 0;
      }
    `}
`;

const Layout = {
  PageContent,
};

export default Layout;
