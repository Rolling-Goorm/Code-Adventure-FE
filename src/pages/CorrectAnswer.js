import React from 'react';
import Layout from '../components/Layout';
import Main from '../components/Main';
import { Name } from '../components/styled';

function CorrectAnswer() {
  return (
    <Main.Wrapper>
      <Layout.PageContent>
        <Name>This is CorrectAnswer</Name>
      </Layout.PageContent>
    </Main.Wrapper>
  );
}

export default CorrectAnswer;
