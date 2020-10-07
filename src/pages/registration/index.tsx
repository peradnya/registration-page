import {
  Layout,
  Menu,
  Typography,
  Form,
  Input,
  Button,
  Select,
  Radio,
  Tooltip,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useCallback, useState } from "react";
import axios from "axios";
import { Option } from "antd/lib/mentions";
import { useRouter } from "next/router";

const { Header, Footer, Content } = Layout;
const { Title } = Typography;

const Registration: React.FC = () => {
  const [form] = useForm();
  const router = useRouter();

  const monthList = Array.from(Array(12), (_, i) => i + 1);
  const dateList = Array.from(Array(31), (_, i) => i + 1);
  const yearList = Array.from(Array(150), (_, i) => i + 1900);

  const [formDisabled, setFormDisabled] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const [mobile, setMobile] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [gender, setGender] = useState();
  const [email, setEmail] = useState();
  const [date, setDate] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();

  const onFinish = useCallback(
    async (value) => {
      setFormDisabled(true);
      setShowError(false);

      try {
        const resp = await axios.post("/api/register", value);
        setShowLogin(true);
      } catch (error) {
        setFormDisabled(false);
        setShowError(true);
        console.log(error.response);
        setErrorText(error.response.data.detail);
      }
    },
    [setFormDisabled, setShowLogin, setShowError, setErrorText]
  );

  const onLogin = useCallback((e) => {
    e.preventDefault();
    router.push("/login");
  }, []);

  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal"></Menu>
      </Header>
      <Content>
        <Title>Registration</Title>
        <Tooltip
          visible={showError}
          title={errorText}
          trigger="contextMenu"
          color="red"
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            name="register"
          >
            <Form.Item name="mobile">
              <Input placeholder="Mobile number" disabled={formDisabled} />
            </Form.Item>
            <Form.Item name="firstname">
              <Input placeholder="First name" disabled={formDisabled} />
            </Form.Item>
            <Form.Item name="lastname">
              <Input placeholder="Last name" disabled={formDisabled} />
            </Form.Item>
            <Form.Item label="Date of Birth">
              <Input.Group compact>
                <Form.Item name={["birthdate", "month"]}>
                  <Select placeholder="Month" disabled={formDisabled}>
                    {monthList.map((value, index) => {
                      return (
                        <Option key={index.toString()} value={value.toString()}>
                          {value}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item name={["birthdate", "date"]}>
                  <Select placeholder="Date" disabled={formDisabled}>
                    {dateList.map((value, index) => {
                      return (
                        <Option key={index.toString()} value={value.toString()}>
                          {value}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item name={["birthdate", "year"]}>
                  <Select placeholder="Year" disabled={formDisabled}>
                    {yearList.map((value, index) => {
                      return (
                        <Option key={index.toString()} value={value.toString()}>
                          {value}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Input.Group>
            </Form.Item>
            <Form.Item name="gender">
              <Radio.Group size="large">
                <Radio value="male" disabled={formDisabled}>
                  Male
                </Radio>
                <Radio value="female" disabled={formDisabled}>
                  Female
                </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="email">
              <Input placeholder="Email" disabled={formDisabled} />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                block
                htmlType="submit"
                disabled={formDisabled}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Tooltip>
      </Content>
      <Footer>
        <Button type="primary" block onClick={onLogin}>
          Login
        </Button>
      </Footer>
    </Layout>
  );
};

export default Registration;
