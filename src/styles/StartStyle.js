import styled from 'styled-components';
import heartImage from '../assets/heart.png';

export const Name = styled.p`
  font-weight: bold;
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

export const Spacer = styled.div`
  margin-top: 130px;
`;
