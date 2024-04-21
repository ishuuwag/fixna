import { useState } from "react";
import { Breadcrumb, Button, Layout, theme } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useAuthContext } from "@asgardeo/auth-react";

const { Header, Content, Footer } = Layout;

const Dashboard = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [isLoading, setLoading] = useState<boolean>(false);

  const { signOut } = useAuthContext();

  const handleSignOut = () => {
    setLoading(true);
    signOut();
  };

  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <Button
          type="primary"
          icon={<LogoutOutlined />}
          loading={isLoading}
          disabled={isLoading}
          onClick={() => handleSignOut()}
        >
          Logout
        </Button>
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </Breadcrumb>
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
      <Footer style={{ textAlign: "center" }}>
        Copyright © {new Date().getFullYear()} Fix Namibia
      </Footer>
    </Layout>
  );
};

export default Dashboard;
