import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Space, Table, Tag, message } from 'antd';
import { Link } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { productsService } from '../services/products.service';

const getColumns = (deleteHandler) => [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: 'Image',
        dataIndex: 'imageUrl',
        key: 'imageUrl',
        render: (text, item) => <img style={styles.imageStyle} src={text} alt={item.name} />,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        render: (text) => <span>{text}$</span>,
    },
    {
        title: 'Discount',
        dataIndex: 'discount',
        key: 'discount',
        render: (text) => text > 0 ? <Tag color="geekblue">{text}%</Tag> : "-",
    },
    {
        title: 'Category',
        dataIndex: 'categoryName',
        key: 'categoryName'
    },
    {
        title: 'Stock',
        dataIndex: 'inStock',
        key: 'inStock',
        render: (text) => text ?
            <Tag color="green">In Stock</Tag> :
            <Tag color="volcano">Out Of Stock</Tag>,
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <Link to={`edit/${record.id}`}>
                    <Button icon={<EditOutlined />}></Button>
                </Link>
                <Popconfirm
                    title="Delete the product"
                    description={`Are you sure to delete the ${record.name}?`}
                    onConfirm={() => deleteHandler(record.id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button danger icon={<DeleteOutlined />}></Button>
                </Popconfirm>

            </Space>
        ),
    },
];

export default function Products() {

    const [products, setProducts] = useState([]);

    const deleteHandler = async (id) => {
        const res = await productsService.delete(id);
        if (res.status === 200) {
            message.success('Product deleted successfully');

            setProducts(products.filter(x => x.id != id));
        }
        else
            message.error('Something went wrong!');
    };

    const loadProducts = async () => {
        const res = await productsService.getAll();
        setProducts(res.data);
    }

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <>
            <Button style={{ marginBottom: 10 }} type="primary">
                <Link to="create">
                    Create New Product
                </Link>
            </Button>
            <Table columns={getColumns(deleteHandler)} pagination={{ pageSize: 5 }} dataSource={products} />
        </>
    );
}

const styles = {
    imageStyle: {
        height: 50,
        width: 50,
        objectFit: "contain"
    }
}