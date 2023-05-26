'use client';

import { auth } from '@/config/firebase';
import { BlockOutlined, FileSearchOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Button, Layout, Menu, theme } from 'antd';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const LogoutButton = ({ setUser }) => {
  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        setUser(auth.currentUser);
        // Успешный выход из системы
        console.log('Выход выполнен успешно');
      })
      .catch((error) => {
        // Обработка ошибок выхода из системы
        console.log('Ошибка выхода:', error);
      });
  };

  return <Button onClick={handleLogout}>Выйти</Button>;
};

const items: MenuItem[] = [
  getItem(<Link href="/login">Вход</Link>, '1', <LoginOutlined />),
  // getItem(<Link href="/registration">Регистрация</Link>, '2', <DesktopOutlined />),
  getItem(<Link href="/moderator">Модератор</Link>, 'sub1', <UserOutlined />),
  getItem(<Link href="/search">Поиск</Link>, '9', <FileSearchOutlined />),

  // getItem(<Link href="/moderator">Страница модератора</Link>, 'sub1', <UserOutlined />, [
  //   getItem('Tom', '3'),
  //   getItem('Bill', '4'),
  //   getItem('Alex', '5'),
  // ]),
];

export default function LayoutMain({ childComponent }) {
  const [user, setUser] = useState(auth.currentUser);

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {}, []);
  //   const user = auth.currentUser;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div
          style={{
            margin: '30px 10px 20px',
          }}>
          <Link href="/" style={{ color: 'white', display: 'flex', justifyContent: 'center' }}>
            <BlockOutlined style={{ position: 'relative', marginRight: '5px' }} />
            {!collapsed && <p>Цифровые дипломы</p>}
          </Link>
        </div>
        <Menu theme="dark" mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'center',
          }}>
          {user ? (
            <>
              <LogoutButton setUser={setUser} />
              <p style={{margin: '0 20px'}}>{auth.currentUser.email}</p>
            </>
          ) :
            <p style={{margin: '0 20px'}}>Пользователь не авторизован</p>

          }
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            {childComponent}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          CollaborationSpace ©2023 Created by Kostrov Gleb, Antropov Alexander
        </Footer>
      </Layout>
    </Layout>
  );
}

{
  /* <Menu.Item key="login">
            <Link href="/login"> <LoginOutlined /> Вход</Link> 
          </Menu.Item>
          <Menu.Item key="moderator">
            <Link href="/moderator"><UserOutlined /> Модератор</Link> 
          </Menu.Item>
          <Menu.Item key="search">
            <Link href="/search"><FileSearchOutlined /> Поиск</Link> 
          </Menu.Item> */
}
{
  /* </Menu> */
}