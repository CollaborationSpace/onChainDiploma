import OnChainDiplomaSDK from '../../blockchain/sdk';

import type { MenuProps } from 'antd';
import React, { useState } from 'react';
import LayoutMain from "../components/Layout";

import { Typography, Row, Col, Card, Button } from 'antd';
// import 'antd/dist/antd.css';

const { Title, Paragraph } = Typography;


const HomeContent = () => {
  return (
    <div>
      <div style={{ padding: '24px' }}>
        <Row gutter={[16, 16]} style={{marginBottom: '20px'}}>
          <Col span={24}>
            <Card>
              <Title level={2}>Добро пожаловать в Цифровые Дипломы</Title>
              <Paragraph>
                Цифровые Дипломы - это инновационная платформа, предназначенная для удобного и безопасного получения электронных версий ваших дипломов.
              </Paragraph>
              <Paragraph>
                Мы сотрудничаем с учебными заведениями и вузами, чтобы обеспечить вас электронными дипломами, которые можно легко сохранить, предоставить работодателю или поделиться в социальных сетях.
              </Paragraph>
              <Paragraph>
                Мы используем передовые технологии блокчейна Ethereum для хранения и подтверждения ваших дипломов. Это обеспечивает безопасность, целостность и непререкаемость ваших академических достижений.
              </Paragraph>
              <Paragraph>
                Присоединяйтесь к Цифровым Дипломам сегодня и воспользуйтесь преимуществами цифровых версий ваших дипломов - быстрый доступ, удобное сохранение и легкое деление с остальным миром!
              </Paragraph>
            </Card>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Card>
              <Title level={4}>Диплом 1</Title>
              <p>Описание диплома 1.</p>
              <Button type="primary">Просмотреть</Button>
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Title level={4}>Диплом 2</Title>
              <p>Описание диплома 2.</p>
              <Button type="primary">Просмотреть</Button>
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Title level={4}>Диплом 3</Title>
              <p>Описание диплома 3.</p>
              <Button type="primary">Просмотреть</Button>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default function Home() {
  const test = new OnChainDiplomaSDK();

  return (
    <LayoutMain childComponent={<HomeContent/>}/>
  );
}