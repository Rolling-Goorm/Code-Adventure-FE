import React from 'react';
import Layout from '../components/Layout';
import Main from '../components/Main';

import { Name } from '../styles/styled';

import CloudButton from '../components/CloudButton';
import { Spacer } from '../styles/StartStyle';
import { Link } from 'react-router-dom';

function Start() {
  return (
    <Main.Wrapper>
      <Layout.PageContent>
        <Name>Code Adventure</Name>
        <Spacer />
        <Link to="/Signin">
          <CloudButton>Login</CloudButton>
        </Link>
      </Layout.PageContent>
    </Main.Wrapper>
  );
}

export default Start;
