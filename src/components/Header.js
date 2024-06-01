import React, { useContext } from 'react'
import { Button, Layout, Menu, Space } from 'antd';
import { EyeOutlined, HomeOutlined, InfoCircleOutlined, LoginOutlined, LogoutOutlined, PlusCircleOutlined, ProductOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { accountsService } from '../services/accounts.service';
import { tokensService } from '../services/tokens.service';
import { UserContext } from '../contexts/user.context';
const { Header: AntHeader } = Layout;

export default function Header() {

    const { isAuth, setIsAuth, email } = useContext(UserContext);

    const onLogout = async () => {
        //await accountsService.logout();
        tokensService.clear();
        setIsAuth(false);
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

            {
                isAuth
                    ?
                    <Space>
                        <span style={{ color: "white" }}>Hello, {email}</span>
                        <span onClick={onLogout} style={{ color: "white", cursor: "pointer" }}><LogoutOutlined /></span>
                    </Space>
                    :
                    <Space size={"middle"}>
                        <Link style={{ color: "white" }} to="register">Register <PlusCircleOutlined /></Link>
                        <Link style={{ color: "white" }} to="login">Login <LoginOutlined /></Link>
                    </Space>
            }

        </AntHeader>
    )
}
