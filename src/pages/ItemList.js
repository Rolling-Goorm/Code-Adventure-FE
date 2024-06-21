import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ItemDetail from './ItemDetail';
import { Name } from '../styles/styled';
import Header from '../components/Header';
import Layout from '../components/Layout';
import Main from '../components/Main';

const Item = styled.li`
  margin: 10px 0;
`;

const Button = styled.button`
  margin-left: 10px;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: left;
`;

const CloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

function ItemList() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    axios
      .get('http://118.67.128.223:8080/items')
      .then((response) => setItems(response.data))
      .catch((error) => console.error('Error fetching items:', error));
  }, []);

  const handleShow = (item) => {
    setSelectedItem(item);
  };

  const handleClose = () => {
    setSelectedItem(null);
  };

  return (
    <Main.Wrapper>
      <Header />

      <Layout.PageContent>
        <Name>Item List</Name>
        <ul>
          {items.map((item) => (
            <Item key={item.id}>
              {item.name} - ${item.price}
              <Button onClick={() => handleShow(item)}>View Details</Button>
            </Item>
          ))}
        </ul>

        {selectedItem && (
          <Modal>
            <ModalContent>
              <CloseButton onClick={handleClose}>&times;</CloseButton>
              <ItemDetail item={selectedItem} />
            </ModalContent>
          </Modal>
        )}
      </Layout.PageContent>
    </Main.Wrapper>
  );
}

export default ItemList;
