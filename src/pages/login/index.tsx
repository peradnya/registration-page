import { Layout, Menu, Typography } from "antd";
import React from "react";

const { Header, Footer, Content } = Layout;
const { Title } = Typography;

/**
 * Login page of application.
 */
const Login: React.FC = () => {
  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal"></Menu>
      </Header>
      <Content className="content">
        <Title>Login</Title>
      </Content>
      <Footer></Footer>
    </Layout>
  );
};

export default Login;
