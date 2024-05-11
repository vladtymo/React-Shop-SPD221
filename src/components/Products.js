import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';

const columns = [
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
                <a>Show</a>
                <a>Edit</a>
                <a>Delete</a>
            </Space>
        ),
    },
];

const api = "https://shopapi-pv221.azurewebsites.net/api/products/all";

export default function Products() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(api).then(res => res.json())
            .then(data => {
                console.log(data);
                setProducts(data);
            })
    }, []);

    return (
        <Table columns={columns} dataSource={products} />
    );
}

const styles = {
    imageStyle: {
        height: 50,
        width: 50,
        objectFit: "contain"
    }
}