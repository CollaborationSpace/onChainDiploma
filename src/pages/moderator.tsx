import LayoutMain from '@/components/Layout';
import Loader from '@/components/Loader';
import { auth } from '@/config/firebase';
import { Button, DatePicker, Form, Input, Select } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import OnChainDiplomaSDK, {
  AcademicQualification,
  Student,
  StudentStatus,
} from '../../blockchain/sdk';

const { Option } = Select;

const ModeratorContent = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [addStudentForm, setAddStudentForm] = useState(false);

  const [students, setStudents] = useState<Student[]>([]);

  const sdk = new OnChainDiplomaSDK();

  // sdk.makeStudent

  useEffect(() => {
    const user = auth.currentUser;

    if (user !== null) {
      setLoading(false);

      const data = sdk.getAllStudents().then((data) => console.log(data));
    } else {
      // перенаправляем на страницу логина
      router.push('/login');
    }
  }, [router]);

  const handleSubmit = (values: Student) => {
    // Handle form submission
    console.log(values);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Form>
            <Form.Item name="mySelect" label="Select">
              <Select>
                <Option value="option1">Option 1</Option>
                <Option value="option2">Option 2</Option>
                <Option value="option3">Option 3</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" onClick={() => setAddStudentForm(true)}>
                Добавить студента в блокчейн
              </Button>
            </Form.Item>
          </Form>
          {addStudentForm && (
            <Form onFinish={handleSubmit}>
              <Form.Item name="id" label="ID">
                <Input type="number" />
              </Form.Item>
              <Form.Item name="fio" label="FIO">
                <Input />
              </Form.Item>
              <Form.Item name="photo" label="Photo">
                <Input />
              </Form.Item>
              <Form.Item name="birthday" label="Birthday">
                <DatePicker />
              </Form.Item>
              <Form.Item name="directionOfStudyCode" label="Direction of Study Code">
                <Input />
              </Form.Item>
              <Form.Item name="universityAddress" label="University Address">
                <Input />
              </Form.Item>
              <Form.Item name="status" label="Status">
                <Select>
                  {Object.values(StudentStatus).map((status) => (
                    <Option key={status} value={status}>
                      {status}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="qualification" label="Qualification">
                <Select>
                  {Object.values(AcademicQualification).map((qualification) => (
                    <Option key={qualification} value={qualification}>
                      {qualification}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          )}
        </>
      )}
    </>
  );
};

const Moderator = () => {
  return <LayoutMain childComponent={<ModeratorContent />} />;
};
export default Moderator;
