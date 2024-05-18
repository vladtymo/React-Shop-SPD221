import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, InputNumber, Select, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { ArrowLeftOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const api = process.env.REACT_APP_API + "products";

export default function CreateProduct() {

    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(process.env.REACT_APP_API + "products/categories")
            .then(res => res.json())
            .then(data => {
                const options = data.map(x => { return { label: x.name, value: x.id }; });
                setCategories(options);
            });
    }, []);

    const onFinish = (values) => {
        console.log('Success:', values);

        // set original file
        values.image = values.image.originFileObj;

        const data = new FormData();

        for (const prop in values) {
            data.append(prop, values[prop]);
        }

        console.log(values);

        // TODO: use Axios instead of fetch
        fetch(api, {
            method: "POST",
            body: data
        }).then(res => {
            if (res.status == 200) {
                alert("Created!");
                navigate(-1);
            }
            else
                alert("Something went wrong!");
        });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.file;
    };

    return (
        <>
            <Button onClick={() => navigate(-1)} type="text" icon={<ArrowLeftOutlined />}></Button>
            <h2 style={{ textAlign: "center" }}>Create New Product</h2>
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
                    <Select
                        placeholder="Select a product category"
                        options={categories}
                    />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    initialValue={null}
                >
                    <TextArea />
                </Form.Item>

                <Form.Item
                    name="image"
                    label="Image"
                    valuePropName="file"
                    getValueFromEvent={normFile}
                    rules={[
                        {
                            required: true,
                            message: 'Please select product image!',
                        },
                    ]}
                >
                    <Upload>
                        <Button icon={<UploadOutlined />}>Click to Choose a File</Button>
                    </Upload>
                </Form.Item>

                <Form.Item
                    name="inStock"
                    valuePropName="checked"
                    initialValue={false}>
                    <Checkbox>In Stock</Checkbox>
                </Form.Item>

                <Form.Item style={{ textAlign: "center" }}>
                    <Button type="primary" htmlType="submit">
                        Create
                    </Button>
                </Form.Item>
            </Form >
        </>
    );
}