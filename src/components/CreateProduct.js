import React from 'react';
import { Button, Checkbox, Form, Input, InputNumber, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { UploadOutlined } from '@ant-design/icons';

const api = "https://shopapi-pv221.azurewebsites.net/api/products";

const onFinish = (values) => {
    console.log('Success:', values);

    // set original file
    values.image = values.image.originFileObj;

    const data = new FormData();

    for (const prop in values) {
        data.append(prop, values[prop]);
    }

    // TODO: use Axios instead of fetch
    fetch(api, {
        method: "POST",
        body: data
    }).then(res => {
        if (res.status == 200)
            alert("Created!");
        else
            alert("Something went wrong!");
    });
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

export default function CreateProduct() {

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.file;
    };

    return (
        <Form
            name="basic"

            style={{
                maxWidth: 500,
                margin: "auto"
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout='vertical'
        >
            <Form.Item
                label="Name"
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Please input product name!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Price"
                name="price"
                rules={[
                    {
                        required: true,
                        message: 'Please input product price!',
                    },
                ]}
            >
                <InputNumber style={{ width: "100%" }} suffix="$" />
            </Form.Item>

            <Form.Item
                label="Discount"
                name="discount"
                rules={[
                    {
                        required: true,
                        message: 'Please input product discount!',
                    },
                ]}
            >
                <InputNumber style={{ width: "100%" }} suffix="%" />
            </Form.Item>

            <Form.Item
                label="Category Id"
                name="categoryId"
                rules={[
                    {
                        required: true,
                        message: 'Please input product category ID!',
                    },
                ]}
            >
                <InputNumber style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
                label="Description"
                name="description"
            >
                <TextArea />
            </Form.Item>

            <Form.Item
                name="image"
                label="Image"
                valuePropName="file"
                getValueFromEvent={normFile}
            >
                <Upload>
                    <Button icon={<UploadOutlined />}>Click to Choose a File</Button>
                </Upload>
            </Form.Item>

            <Form.Item
                name="inStock"
                valuePropName="checked">
                <Checkbox>In Stock</Checkbox>
            </Form.Item>

            <Form.Item style={{ textAlign: "center" }}>
                <Button type="primary" htmlType="submit">
                    Create
                </Button>
            </Form.Item>
        </Form >
    );
}