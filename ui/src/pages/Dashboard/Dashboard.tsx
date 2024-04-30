import { useEffect, useState } from "react";
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
import { DefectsApi } from "../../api";
import { getApiConfig } from "../../utils/api";
import { SelectInfo } from "rc-menu/lib/interface";
import { useNavigate } from "react-router-dom";
import * as n from "../../routes/navigation";

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

  const { signOut, getAccessToken, state } = useAuthContext();
  const navigate = useNavigate();
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
          user_id: state.sub ?? "",
          description: desc,
          town: town,
          longitude: location?.longitude ?? 22.5649,
          latitude:
            location?.latitude === undefined ? -17.0842 : -location.latitude,
        },
        img
      );
      form.resetFields()
      setLoading(false);
      messageApi.success("Defect created sucessfully!")
    } catch (err: any) {
      setLoading(false);
      messageApi.error(`Could not create defect: ${err?.message}. Please try again`)
      console.log(err);
    }
  };

  const onGeoLocationGranted = (position: GeolocationPosition) => {
    if (location) {
      form.setFieldValue("latitude", position.coords.latitude);
      form.setFields([
        { name: "latitude", value: position.coords.latitude },
        { name: "longitude", value: position.coords.longitude },
      ]);
      setLocation(position.coords);
    } else {
      messageApi.warning("Could not get corddinates please try again");
    }
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

  const handleMenuSeletion = (e: SelectInfo) => {
    if (e.key === "2") {
      console.log("test");
    }
  };

  const opts: PositionOptions = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
  };

  const items = [
    { label: "Enter defect", key: "1" },
    { label: "All defects", key: "2" },
  ];

  useEffect(() => {
    if (!state.isAuthenticated) navigate(n.HOME);
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
              <Form.Item name="geolocation" label="Use my current location">
                <Switch
                  onChange={getCoordinates}
                  checked={location !== undefined}
                />
              </Form.Item>
              <Form.Item
                name="longitude"
                label="Longitude"
                rules={[{ required: true }]}
              >
                <InputNumber stringMode step={0.0000001} />
              </Form.Item>
              <Form.Item
                name="latitude"
                label="Latitude"
                rules={[{ required: true }]}
              >
                <InputNumber stringMode step={0.0000001} />
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
