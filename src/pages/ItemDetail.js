import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import PurchasePopup from './PurchasePopup';
import Header from '../components/Header';
import Layout from '../components/Layout';
import Main from '../components/Main';
import { Name } from '../styles/styled';
function ItemDetail({ item }) {
  const [itemDetails, setItemDetails] = useState(null);

  useEffect(() => {
    axios
      .get(`http://118.67.128.223:8080/items/${item.id}`)
      .then((response) => setItemDetails(response.data))
      .catch((error) => console.error('Error fetching item details:', error));
  }, [item.id]);

  if (!itemDetails) {
    return <div>Loading...</div>;
  }

  return (
    <Main.Wrapper>
      <Header />
      <Layout.PageContent>
        <Name>{itemDetails.name}</Name>
        <p>Price: ${itemDetails.price}</p>
        <p>Stock Quantity: {itemDetails.stockQuantity}</p>
        {itemDetails.stockQuantity > 0 ? (
          <PurchasePopup item={itemDetails} />
        ) : (
          <p>Out of stock</p>
        )}
      </Layout.PageContent>
    </Main.Wrapper>
  );
}

ItemDetail.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    stockQuantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default ItemDetail;
