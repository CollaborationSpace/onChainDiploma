import LayoutMain from '@/components/Layout';
import { Card, Typography } from 'antd';
import { BigNumber } from 'ethers';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import OnChainDiplomaSDK from '../../../blockchain/sdk';
const { Title, Text } = Typography;

const DiplomContent: FC = () => {
  const [diplom, setDiplom] = useState<any>();
  const [pageId, setPageId] = useState<any>();
  const [loading, setLoading] = useState(true);

  const test = new OnChainDiplomaSDK();

  const router = useRouter();

  useEffect(() => {
    if (router.query.id) {
      setLoading(false);
      const num = BigNumber.from(Number(router.query.id));
      test.getStudentById(num).then((res) => {
        setDiplom(res);
        setPageId(router.query.id);
        console.log(res);
      });
    }
  }, [router.query.id]);

  return (
    <Card>
      {!loading && diplom && (
        <>
          <Title level={2}>{diplom.title}</Title>
          <p >ФИО: {diplom.fio}</p>
          <p>Дата рождения: {new Date(diplom.birthday).toLocaleDateString()}</p>
          <p>Код направления обучения: {diplom.directionOfStudyCode}</p>
          <p>Квалификация: {diplom.qualification}</p>
          <p>Статус: {diplom.status}</p>
          <p>Адрес университета: {diplom.universityAddress}</p>
        </>
      )}
    </Card>
  );
};

const Diplom = ({ params }) => {
  return <LayoutMain childComponent={<DiplomContent params={params} />} />;
};

export default Diplom;
