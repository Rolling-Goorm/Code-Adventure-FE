import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Layout from '../components/Layout';
import Main from '../components/Main';

const PurchaseContainer = styled.div`
  margin-top: 20px;
`;

const Input = styled.input`
  margin-right: 10px;
`;

const Button = styled.button`
  padding: 5px 10px;
`;

const Message = styled.p`
  margin-top: 10px;
  color: red;
`;

function PurchasePopup({ item }) {
  const [usedCoin, setUsedCoin] = useState(0);
  const [message, setMessage] = useState('');

  const handlePurchase = () => {
    axios
      .post(`http://118.67.128.223:8080/items/${item.id}`, { usedCoin })
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error('Error purchasing item:', error);
        setMessage('Purchase failed');
      });
  };

  return (
    <Main.Wrapper>
      <Header />
      <Layout.PageContent>
        <Input
          type="number"
          placeholder="Enter amount of coin"
          value={usedCoin}
          onChange={(e) => setUsedCoin(e.target.value)}
        />
        <Button onClick={handlePurchase}>Purchase</Button>
        {message && <Message>{message}</Message>}
      </Layout.PageContent>
    </Main.Wrapper>
  );
}

PurchasePopup.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    stockQuantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default PurchasePopup;
