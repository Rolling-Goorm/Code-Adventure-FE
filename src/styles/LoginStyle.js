import styled from 'styled-components';
import background from '../assets/background.png';

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: url(${background}) no-repeat center center fixed;
  background-size: cover;
  overflow-y: auto;
`;
export const ErrorMessage = styled.p`
  color: red;
`;

export const PageContent = styled.div`
  padding: 20px;
  background: white;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  margin: 20px;
`;

export const Title = styled.h1`
  margin-bottom: 20px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: left;
`;

export const Button = styled.button`
  width: 300px;
  padding: 10px;
  margin: 10px 0;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export const Spacer = styled.div`
  height: 20px;
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-height: 350px;
  overflow-y: auto;
  overflow-x: hidden;

  gap: 15px;
`;

export const UserInfoItem = styled.div`
  margin-bottom: 10px;
  font-size: 16px;
  color: #333;
  text-align: left;
`;
