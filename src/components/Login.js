import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { accountsService } from '../services/accounts.service';

export default function Login() {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        console.log('Success:', values);

        try {
            const res = await accountsService.login(values);

            message.success("Your logged in successfully!");
            navigate(-1);

        } catch (error) {
            message.error(error.response.data.message);
        }
    };

    return (
        <>
            <h1 style={center}>Login Form</h1>
            <Form
                name="basic"
                style={{
                    maxWidth: 400,
                    margin: "auto"
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                autoComplete="off"
                layout='vertical'
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
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
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    style={center}
                >
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

const center = {
    textAlign: "center"
}