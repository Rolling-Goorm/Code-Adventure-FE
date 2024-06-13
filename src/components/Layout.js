import styled from 'styled-components';
import background from '../assets/background.png';

const Layout = {
  PageContent: styled.div`
    box-shadow: 0px -6px 15px 5px rgba(0, 0, 0, 0.08);
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 30px;
    /* border-radius: 60px 60px 60px 60px; */
    padding: 10px 30px 0px 30px;
    background-image: url(${background});
    background-size: cover;
    background-position: center;
    width: 70%;
    height: 650px;
  `,
};

export default Layout;
