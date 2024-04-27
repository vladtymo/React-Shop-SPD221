import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
const { Header, Content, Footer } = Layout;

const items = [
  {
    key: 1,
    label: "Home",
    icon: <HomeOutlined />
  },
  {
    key: 2,
    label: "Products"
  },
  {
    key: 3,
    label: "About"
  }
]

const App = () => {

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>

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
          Content
        </div>
      </Content>

      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};
export default App;