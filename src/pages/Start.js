import React from 'react';
import Layout from '../components/Layout';
import Main from '../components/Main';

import { Name } from '../components/styled';
import CloudButton from '../components/CloudButton';
import { Spacer } from '../styles/StartStyle';

function Start() {
  return (
    <Main.Wrapper>
      <Layout.PageContent>
        <Name>Code Adventure</Name>
        <Spacer />
        <CloudButton>Login</CloudButton>
      </Layout.PageContent>
    </Main.Wrapper>
  );
}

export default Start;
