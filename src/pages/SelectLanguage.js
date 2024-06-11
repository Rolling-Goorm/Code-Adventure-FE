import React from 'react';
import Layout from '../components/Layout';
import Main from '../components/Main';

import { Name, Strong, Button } from '../components/styled';

function SelectLanguage() {
  return (
    <Main.Wrapper>
      <Layout.PageContent>
        <Name>
          사용할 <Strong>언어</Strong>를 선택해주세요
        </Name>
        <Button>JAVA</Button>
        <Button>JAVASCRIPT</Button>
      </Layout.PageContent>
    </Main.Wrapper>
  );
}

export default SelectLanguage;
