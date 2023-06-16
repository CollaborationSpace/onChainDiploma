import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import OnChainDiplomaSDK, { Student } from '../../blockchain/sdk';

import LayoutMain from '../components/Layout';

import { Button, Card, Col, Row, Typography } from 'antd';
// import 'antd/dist/antd.css';

const { Title, Paragraph } = Typography;

const HomeContent = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  const sdk = new OnChainDiplomaSDK(
    undefined,
    new ethers.Wallet(
      '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
      new ethers.providers.JsonRpcProvider(),
    ),
  );

  useEffect(() => {
    sdk.getAllStudents().then((data) => {
      setStudents(data);
      setLoading(false);
      console.log(students);
    });
  }, []);

  return (
    <div>
      <div style={{ padding: '24px' }}>
        <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
          <Col span={24}>
            <Card>
              <Title level={2}>Добро пожаловать в Цифровые Дипломы</Title>
              <Paragraph>
                Цифровые Дипломы - это инновационная платформа, предназначенная для удобного и
                безопасного получения электронных версий ваших дипломов.
              </Paragraph>
              <Paragraph>
                Мы сотрудничаем с учебными заведениями и вузами, чтобы обеспечить вас электронными
                дипломами, которые можно легко сохранить, предоставить работодателю или поделиться в
                социальных сетях.
              </Paragraph>
              <Paragraph>
                Мы используем передовые технологии блокчейна Ethereum для хранения и подтверждения
                ваших дипломов. Это обеспечивает безопасность, целостность и непререкаемость ваших
                академических достижений.
              </Paragraph>
              <Paragraph>
                Присоединяйтесь к Цифровым Дипломам сегодня и воспользуйтесь преимуществами цифровых
                версий ваших дипломов - быстрый доступ, удобное сохранение и легкое деление с
                остальным миром!
              </Paragraph>
            </Card>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          {students.slice(0, 3).map((student, index) => {
            return (
              <Col span={8} key={index}>
                <Card>
                  <Title level={4}>{student.title}</Title>
                  <p>{student.fio}</p>
                  <Button type="primary">Просмотреть</Button>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};

export default function Home() {
  const test = new OnChainDiplomaSDK();

  return <LayoutMain childComponent={<HomeContent />} />;
}
