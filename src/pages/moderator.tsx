import LayoutMain from '@/components/Layout';
import Loader from '@/components/Loader';
import { auth } from '@/config/firebase';
import { Button, Form, Select } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import OnChainDiplomaSDK from '../../blockchain/sdk';

const { Option } = Select;

const ModeratorContent = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const sdk = new OnChainDiplomaSDK();

  // sdk.makeStudent

  useEffect(() => {
    const user = auth.currentUser;

    if (user !== null) {
      setLoading(false);

      const data = sdk.getAllStudents().then(data => console.log(data));
    } else {
      // перенаправляем на страницу логина
      router.push('/login');
    }
  }, [router]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Form>
          <Form.Item name="mySelect" label="Select">
            <Select>
              <Option value="option1">Option 1</Option>
              <Option value="option2">Option 2</Option>
              <Option value="option3">Option 3</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Добавить студента в блокчейн
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

const Moderator = () => {
  return <LayoutMain childComponent={<ModeratorContent />} />;
};
export default Moderator;
