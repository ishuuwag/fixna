import { useState } from "react";
import {
  Breadcrumb,
  Button,
  Form,
  Input,
  InputNumber,
  Layout,
  Menu,
  Select,
  Upload,
  UploadFile,
  UploadProps,
  theme,
  message,
  Switch,
} from "antd";
import { LogoutOutlined, UploadOutlined } from "@ant-design/icons";
import { useAuthContext } from "@asgardeo/auth-react";
import ContentFooter from "../../components/Footer/ContentFooter";
import MenuItem from "antd/es/menu/MenuItem";
import { DefectsApi } from "../../api";
import { getApiConfig } from "../../utils/api";

const { Header, Content } = Layout;
const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const Dashboard = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [form] = Form.useForm();

  const [isSigningOut, setSigningOut] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [location, setLocation] = useState<GeolocationCoordinates | undefined>(
    undefined
  );

  const { signOut, getAccessToken } = useAuthContext();
  const [messageApi, contextHolder] = message.useMessage();

  const handleSignOut = () => {
    setSigningOut(true);
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
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  const onFinish = async () => {
    setLoading(true);
    const t = await getAccessToken();
    const c = getApiConfig(t);
    const api = new DefectsApi(c);
    const desc = form.getFieldValue("description") as string;
    const town = form.getFieldValue("town") as string;
    try {
      const img = fileList[0] as unknown as File;
      const res = await api.createDefect(
        {
          description: desc,
          town: town,
          longitude: location?.longitude ?? 22.5649,
          latitude:
            location?.latitude === undefined ? -17.0842 : -location.latitude,
        },
        img
      );
      setLoading(false);
      console.log(res);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const onGeoLocationGranted = (position: GeolocationPosition) => {
    console.log("coords-before", location);
    setLocation(position.coords);
    console.log("coords-after", location);
  };

  const getCoordinates = async (checked: boolean) => {
    if (checked) {
      if (navigator.geolocation) {
        const perm = await navigator.permissions.query({ name: "geolocation" });
        if (perm.state === "granted" || perm.state === "prompt") {
          navigator.geolocation.getCurrentPosition(
            onGeoLocationGranted,
            onGeoLocationError,
            opts
          );
        } else {
          messageApi.warning(
            "Geolocation was denied, application might not work properly"
          );
        }
      } else {
        messageApi.warning("Geolocation is not supported by this browser.");
      }
    }
  };

  const onGeoLocationError = (err: GeolocationPositionError) => {
    messageApi.error(`Could not obtain geolocation: ${err.message}`);
  };

  const opts: PositionOptions = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
  };

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
          >
            <MenuItem key={1}>Enter defect</MenuItem>
            <MenuItem key={2}>All defects</MenuItem>
          </Menu>
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
                <Input />
              </Form.Item>
              <Form.Item name="town" label="Town" rules={[{ required: true }]}>
                <Select placeholder="Select your town" allowClear>
                  <Option value="Windhoek">Windhoek</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="geolocation"
                label="Get coordinates from my location"
              >
                <Switch onChange={getCoordinates} />
              </Form.Item>
              <Form.Item
                name="longitude"
                label="Longitude"
                rules={[{ required: true }]}
              >
                <InputNumber
                  value={location?.longitude}
                  stringMode
                  step={0.0001}
                />
              </Form.Item>
              <Form.Item
                name="latitude"
                label="Latitude"
                rules={[{ required: true }]}
              >
                <InputNumber
                  value={location?.latitude}
                  stringMode
                  step={0.0001}
                />
              </Form.Item>
              <Form.Item
                name="image"
                label="Image"
                rules={[{ required: true }]}
              >
                <Upload {...props}>
                  <Button icon={<UploadOutlined />}>Select File</Button>
                </Upload>
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                  disabled={isLoading}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Content>
        <ContentFooter />
      </Layout>
    </>
  );
};

export default Dashboard;
