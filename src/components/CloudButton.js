import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Circle = styled.div`
  width: 200px;
  height: 100px;
  background-color: #3498db;
  border-radius: 50%;
  position: absolute;
  color: white;
  font-size: 50px; /* Adjust font-size as needed */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CircleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 250px; /* Adjust as needed to control overlap */
  height: 100px;
`;

const CloudButton = ({ children }) => {
  return (
    <CircleContainer>
      <Circle style={{ zIndex: 1, left: '-100px' }} />
      <Circle style={{ zIndex: 3, left: '0px' }}>{children}</Circle>
      <Circle style={{ zIndex: 1, left: '100px' }} />
    </CircleContainer>
  );
};

CloudButton.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CloudButton;
