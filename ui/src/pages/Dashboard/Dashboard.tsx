import { useState } from "react";
import {
  Breadcrumb,
  Button,
  Form,
  Input,
  Layout,
  Menu,
  Select,
  Upload,
  UploadFile,
  UploadProps,
  theme,
} from "antd";
import { LogoutOutlined, UploadOutlined } from "@ant-design/icons";
import { useAuthContext } from "@asgardeo/auth-react";
import ContentFooter from "../../components/Footer/ContentFooter";
import MenuItem from "antd/es/menu/MenuItem";
import { DefectsApi } from "../../api";
import { getApiConfig } from "../../utils/api";

const { Header, Content } = Layout;
const { Option } = Select;
const { TextArea } = Input;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const Dashboard = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [form] = Form.useForm();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const { signOut, getAccessToken } = useAuthContext();

  const handleSignOut = () => {
    setLoading(true);
    signOut();
  };

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      console.log(file.uid)
      setFileList([...fileList, file]);

      return false;
    },
    fileList,
  };

  const onFinish = async () => {
    console.log(fileList.length)

    const t = await getAccessToken();
    const c = getApiConfig(t)
    console.log(c.accessToken)
    const api = new DefectsApi(c);
    try {
      const img = fileList[0] as unknown as File
      console.log(img)
      const res = await api.createDefect(
        { description: "test", town: "Windhoek", longitude: 27, latitude: 22 },
        img
      );

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
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
        >
          <MenuItem key={1}>Enter defect</MenuItem>
          <MenuItem key={2}>All defects</MenuItem>
        </Menu>
        <Button
          type="primary"
          icon={<LogoutOutlined />}
          loading={isLoading}
          disabled={isLoading}
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
        </Breadcrumb>
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
          >
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true }]}
            >
              <TextArea rows={4} maxLength={6} />
            </Form.Item>
            <Form.Item name="town" label="Town" rules={[{ required: true }]}>
              <Select
                placeholder="Select your town"
                //onChange={onGenderChange}
                allowClear
              >
                <Option value="Windhoek">Windhoek</Option>
              </Select>
            </Form.Item>
            <Form.Item name="image" label="Image" rules={[{ required: true }]}>
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Select File</Button>
              </Upload>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
      <ContentFooter />
    </Layout>
  );
};

export default Dashboard;
