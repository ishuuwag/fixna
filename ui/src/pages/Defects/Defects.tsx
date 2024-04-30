import { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Layout,
  Menu,
  theme,
  message,
  Avatar,
  List,
  Space,
  Spin,
} from "antd";
import {
  LogoutOutlined,
  LikeOutlined,
  MessageOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { useAuthContext } from "@asgardeo/auth-react";
import ContentFooter from "../../components/Footer/ContentFooter";
import { SelectInfo } from "rc-menu/lib/interface";
import React from "react";
import { DefectsApi, Issue } from "../../api";
import { getApiConfig } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import * as n from "../../routes/navigation";

const { Header, Content } = Layout;

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Defects = () => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [isSigningOut, setSigningOut] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [defects, setDefects] = useState<Array<Issue>>([]);
  const { signOut, getAccessToken, state } = useAuthContext();
  const [messageApi, contextHolder] = message.useMessage();

  const handleSignOut = () => {
    setSigningOut(true);
    signOut();
    navigate(n.HOME);
  };

  const handleMenuSeletion = (e: SelectInfo) => {
    if (e.key === "2") {
      console.log("test");
    }
  };

  const items = [
    { label: "Enter defect", key: "1" },
    { label: "All defects", key: "2" },
  ];

  const renderDefect = (item: Issue) => {
    return (
      <List.Item
        key={item.description}
        actions={[
          <IconText
            icon={StarOutlined}
            text="156"
            key="list-vertical-star-o"
          />,
          <IconText
            icon={LikeOutlined}
            text="156"
            key="list-vertical-like-o"
          />,
          <IconText
            icon={MessageOutlined}
            text="2"
            key="list-vertical-message"
          />,
        ]}
        extra={
          <img
            width={272}
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        }
      >
        <List.Item.Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title={<p>{item.description}</p>}
          description={`${item.latitude}, ${item.longitude}`}
        />
        Windhoek
      </List.Item>
    );
  };

  useEffect(() => {
    async function fetchDefects() {
      try {
        setLoading(true);
        const t = await getAccessToken();
        const c = getApiConfig(t);
        const api = new DefectsApi(c);
        const res = await api.getDefects();
        setDefects(res?.data?.issues);
        setLoading(false);
      } catch (err: any) {
        setLoading(false);
        messageApi.error(
          `Couldn't fetch defects: ${err.message}. Please try again.`
        );
      }
    }

    if (state.isAuthenticated) fetchDefects();
    else navigate(n.HOME);
  });

  return (
    <>
      {contextHolder}
      <Layout>
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            style={{ flex: 1, minWidth: 0 }}
            items={items}
            onSelect={handleMenuSeletion}
          ></Menu>
          <Button
            type="primary"
            icon={<LogoutOutlined />}
            loading={isSigningOut}
            disabled={isSigningOut}
            onClick={() => handleSignOut()}
            style={{ marginLeft: "auto" }}
          >
            Logout
          </Button>
        </Header>
        <Content style={{ padding: "0 48px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>Defects</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 380,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {isLoading ? (
              <Space size="middle">
                <Spin size="large" />
              </Space>
            ) : (
              <List
                itemLayout="vertical"
                size="large"
                pagination={{
                  onChange: (page) => {
                    console.log(page);
                  },
                  pageSize: 3,
                }}
                dataSource={defects}
                footer={
                  <div>
                    <b>Fix Namibia</b> Defects
                  </div>
                }
              >
                {defects.map((x) => renderDefect(x))}
              </List>
            )}
          </div>
        </Content>
        <ContentFooter />
      </Layout>
    </>
  );
};

export default Defects;
