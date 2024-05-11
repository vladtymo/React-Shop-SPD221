import React from 'react';
import { Layout, theme } from 'antd';
import Header from './components/Header';
import Footer from './components/Footer';
import "./App.css"
import { Outlet } from 'react-router-dom';
const { Content } = Layout;

const App = () => {

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className='Layout'>
      <Header />
      <Content
        style={{
          padding: '0 48px',
          marginTop: 20
        }}
      >
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>

      <Footer />
    </Layout>
  );
};
export default App;