"use client";
import { Button, Col, Divider, Form, Input, notification, Row } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import { authenticate, loginGoogle } from "@/utils/actions";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ModalReactive from "../general/organisms/auth/modal.reactive";
import { useState } from "react";
import ModalChangePassword from "../general/organisms/auth/modal.change.password";

const Login = () => {
  const { data: session } = useSession();

  //   console.log("Check Session ", session);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);``
  const [userEmail, setUserEmail] = useState("");

  const [changePassword, setChangePassword] = useState(false);

  const onFinish = async (values: any) => {
    const { username, password } = values;
    setUserEmail("");
    //trigger sign-in
    const res = await authenticate(username, password);

    if (res?.error) {
      //error
      if (res?.code === 2) {
        setIsModalOpen(true);
        setUserEmail(username);
        return;
      }
      notification.error({
        message: "Error login",
        description: res?.error,
      });
    } else {
      //redirect to /dashboard
      router.push("/dashboard");
    }
  };

  const handleLoginGoogle = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <>
      <Row justify={"center"} style={{ marginTop: "30px" }}>
        <Col xs={24} md={16} lg={8}>
          <fieldset
            style={{
              padding: "15px",
              margin: "5px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            <legend>Đăng Nhập</legend>
            <Form
              name="basic"
              onFinish={onFinish}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label="Email"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Login
                  </Button>
                  <Button type="link" onClick={() => setChangePassword(true)}>
                    Quên mật khẩu ?
                  </Button>
                </div>
              </Form.Item>
            </Form>

            <Button
              onClick={handleLoginGoogle}
              type="primary"
              block
              style={{ margin: "10px 0px" }}
            >
              Sign In With Google
            </Button>

            <Link href={"/"}>
              <ArrowLeftOutlined /> Quay lại trang chủ
            </Link>
            <Divider />
            <div style={{ textAlign: "center" }}>
              Chưa có tài khoản?{" "}
              <Link href={"/auth/register"}>Đăng ký tại đây</Link>
            </div>
          </fieldset>
        </Col>
      </Row>
      <ModalReactive
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        userEmail={userEmail}
      />
      <ModalChangePassword
        isModalOpen={changePassword}
        setIsModalOpen={setChangePassword}
      />
    </>
  );
};

export default Login;
