// src/components/StyledComponents.js
import styled from 'styled-components';
import heartImage from '../assets/heart.png'; // 하트 이미지 경로

export const Name = styled.p`
  font-size: 50px;
  padding: 20px;
  text-align: center;
  position: relative;
  color: white;
  text-shadow:
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000,
    -2px -2px 0 #000,
    2px -2px 0 #000,
    -2px 2px 0 #000,
    2px 2px 0 #000,
    -3px -3px 0 #000,
    3px -3px 0 #000,
    -3px 3px 0 #000,
    3px 3px 0 #000,
    -4px -4px 0 #000,
    4px -4px 0 #000,
    -4px 4px 0 #000,
    4px 4px 0 #000;

  &::before,
  &::after {
    content: '';
    display: inline-block;
    width: 50px; /* 하트 이미지 너비 */
    height: 50px; /* 하트 이미지 높이 */
    background-image: url(${heartImage});
    background-size: contain;
    background-repeat: no-repeat;
    margin: 0 10px;
    vertical-align: middle;
  }
`;

export const Strong = styled.span`
  color: yellow;
`;

export const Button = styled.button`
  display: block;
  margin: 10px auto;
  padding: 50px 20px;
  font-size: 30px;
  color: white;
  background: none;
  font-weight: bold;
  border: none;
  text-shadow:
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000;
  cursor: pointer;
  transition: font-size 0.3s ease;

  &:hover {
    font-size: 33px;
    color: yellow;
  }

  &::before {
    content: '▶';
    margin-right: 10px;
  }
`;
