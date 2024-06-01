import React from 'react'
import { Button, Layout, Menu } from 'antd';
import { EyeOutlined, HomeOutlined, InfoCircleOutlined, LoginOutlined, PlusCircleOutlined, ProductOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { accountsService } from '../services/accounts.service';
import { tokensService } from '../services/tokens.service';
const { Header: AntHeader } = Layout;

export default function Header() {

    const onLogout = async () => {
        //await accountsService.logout();
        tokensService.clear();
    }

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
            label: <Link to="fake-products">Fake Products</Link>,
            icon: <EyeOutlined />
        },
        {
            key: 4,
            label: <Link to="about">About</Link>,
            icon: <InfoCircleOutlined />
        },
        {
            key: 5,
            label: <Link to="register">Register</Link>,
            icon: <PlusCircleOutlined />
        },
        {
            key: 6,
            label: <Link to="login">Login</Link>,
            icon: <LoginOutlined />
        },
        // {
        //     key: 7,
        //     label: <a onClick={onLogout}></a>,
        //     icon: <LoginOutlined />
        // }
    ]

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
                defaultSelectedKeys={['1']}
                items={items}
                style={{
                    flex: 1,
                    minWidth: 0,
                }}
            />

            <span onClick={onLogout} style={{ color: "white", cursor: "pointer" }}><LoginOutlined /></span>

        </AntHeader>
    )
}
