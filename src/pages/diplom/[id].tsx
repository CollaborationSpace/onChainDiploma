import LayoutMain from '@/components/Layout';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import OnChainDiplomaSDK from '../../../blockchain/sdk';

const DiplomContent: FC = () => {
  const [diplom, setDiplom] = useState<any>();
  

  const test = new OnChainDiplomaSDK();

  const router = useRouter();
  

  useEffect(() => {
    // вывести текущей ur);
    test.getStudentById(router.query.id).then((res) => {
      setDiplom(res);
      console.log(res);
    })
  }, []);

  return (
    <>
      <div>Страница диплома</div>
      <div>fkdjfkj</div>
    </>
  );
};

const Diplom = ({ params }) => {
  return <LayoutMain childComponent={<DiplomContent />} />;
};

export default Diplom;
