import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, InputNumber, Select, Upload, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { ArrowLeftOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { productsService } from '../services/products.service';
import { useForm } from 'antd/es/form/Form';

export default function ProductForm() {

    const [categories, setCategories] = useState([]);
    const params = useParams();
    const [form] = Form.useForm();
    const [editMode, setEditMode] = useState(false);
    const [product, setProduct] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        loadProduct();

        // TODO: use service
        fetch(process.env.REACT_APP_API + "products/categories")
            .then(res => res.json())
            .then(data => {
                const options = data.map(x => { return { label: x.name, value: x.id }; });
                setCategories(options);
            });
    }, []);

    const loadProduct = async () => {
        if (params.id) {
            setEditMode(true);

            const res = await productsService.get(params.id);
            setProduct(res.data);
            form.setFieldsValue(res.data);
        }
    }

    const onFinish = async (values) => {

        if (editMode) {
            // add neccessary data
            values.id = product.id;
            values.imageUrl = product.imageUrl;
            values.newImage = values.image;

            const res = await productsService.edit(values);
            console.log(res);

            if (res.status == 200) {
                message.success("Product updated successfully!");
                navigate(-1);
            }
            else
                alert("Something went wrong!");
        }
        else {
            const res = await productsService.create(values);

            if (res.status == 200) {
                message.success("Product created successfully!");
                navigate(-1);
            }
            else
                alert("Something went wrong!");
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        // set original file
        return e?.file.originFileObj;
    };

    return (
        <>
            <Button onClick={() => navigate(-1)} type="text" icon={<ArrowLeftOutlined />}></Button>
            <h2 style={{ textAlign: "center" }}>{editMode ? "Edit" : "Create"} Product</h2>
            <Form
                name="basic"
                form={form}
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
                    label="Category"
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
                            required: editMode ? false : true,
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
                        {editMode ? "Edit" : "Create"}
                    </Button>
                </Form.Item>
            </Form >
        </>
    );
}