import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // useNavigate import
import { AuthContext } from './AuthContext';
import title from '../assets/title.png'; // 업로드된 파일 경로

// Styled components
const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  position: absolute;
  top: 0;
  width: 100%;
  height: 80px;
  background-color: white;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.02);
  z-index: 1000; /* 본문 내용 위에 있도록 설정 */
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer; /* 호버 시 커서 변경 */
`;

const Logo = styled.img`
  height: 40px;
  margin-left: 50px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 30px;
  margin-right: 50px;
`;

// Header component
const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate(); // useNavigate hook 사용

  const handleLogout = () => {
    logout(); // AuthContext의 logout 함수 호출
    localStorage.clear(); // 로컬 스토리지 비우기
    navigate('/'); // 홈으로 이동
  };
  const handleLogoClick = () => {
    navigate('/'); // 로고 클릭 시 홈으로 이동
  };

  return (
    <HeaderContainer>
      <LogoContainer onClick={handleLogoClick}>
        <Logo src={title} alt="Logo" />
      </LogoContainer>
      <Nav>
        {user ? (
          <>
            <a href="/selectlanguage">언어선택</a>
            <a href="/selectcategory">카테고리</a>
            <a href="/selectstages">스테이지</a>
            <a href="/mypages">마이 페이지</a>
            <a href="/ItemList">상점</a>
            <a href="/" onClick={handleLogout}>
              로그아웃
            </a>
          </>
        ) : (
          <>
            <a href="/signup">회원가입</a>
            <a href="/gameinfo">게임소개</a>
          </>
        )}
      </Nav>
    </HeaderContainer>
  );
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default Header;
