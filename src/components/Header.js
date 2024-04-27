import React from 'react'
import { Layout, Menu } from 'antd';
import { HomeOutlined, InfoCircleOutlined, ProductOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { Header: AntHeader } = Layout;

const items = [
    {
        key: 1,
        label: <Link to="/">Home</Link>,
        icon: <HomeOutlined />
    },
    {
        key: 2,
        label: <Link to="products">Products</Link>,
        icon: <ProductOutlined />
    },
    {
        key: 3,
        label: <Link to="about">About</Link>,
        icon: <InfoCircleOutlined />
    }
]

export default function Header() {
    return (
        <AntHeader
            style={{
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <div className="demo-logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                items={items}
                style={{
                    flex: 1,
                    minWidth: 0,
                }}
            />
        </AntHeader>
    )
}
