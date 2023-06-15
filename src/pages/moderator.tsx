import LayoutMain from '@/components/Layout';
import Loader from '@/components/Loader';
import { auth } from '@/config/firebase';
import { Button, DatePicker, Form, Input, Select } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { BigNumber, ethers } from 'ethers';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import OnChainDiplomaSDK, {
  AcademicQualification,
  Student,
  StudentStatus,
} from '../../blockchain/sdk';

const { Option } = Select;

interface IStudentForm {
  students: Student[];
  mode: 'Добавить' | 'Изменить';
  sdk: any;
  setStudents: any;
  setAddStudentForm: any;
  setEditStudentForm: any;
  student: any;
}

type EnumObject = { [key: string]: number | string };
type EnumObjectEnum<E extends EnumObject> = E extends { [key: string]: infer ET | string }
  ? ET
  : never;

function getEnumValues<E extends EnumObject>(enumObject: E): EnumObjectEnum<E>[] {
  return Object.keys(enumObject)
    .filter((key) => Number.isNaN(Number(key)))
    .map((key) => enumObject[key] as EnumObjectEnum<E>);
}

const StudentForm: FC<IStudentForm> = ({
  students,
  sdk,
  mode,
  setStudents,
  setEditStudentForm,
  setAddStudentForm,
  student,
}) => {
  const [form] = Form.useForm();
  const [selStudent, setSelStudent] = useState(students[student]);

  const handleFinish = (values: Student, mode: string) => {

    // Handle form submission
    values.birthday = Number(values.birthday);


    values.status = StudentStatus[values.status].toString();
    values.qualification = AcademicQualification[values.qualification].toString();

    values.universityAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';

    // console.log(values, selStudent)
    if (mode === 'Добавить') {
      if (students.length > 0) {
        values.id = BigNumber.from(Number(students[students.length - 1].id) + 1);
      } else {
        values.id = BigNumber.from(1);
      }

      sdk.addNewStudents([values]).then(() => {
        sdk.getAllStudents().then((data) => {
          setStudents(data);
          console.log(data);
        });
        form.resetFields();
      });
    } else {
      values.id = students[student].id
      console.log(values);
      sdk.updateStudent(values).then(() => {
        sdk.getAllStudents().then((data) => {
          setStudents(data);
          console.log(data);
        });
        form.resetFields();
      });
    }
  };

  // console.log(selStudent);
  return (
    <Form
      onFinish={(values) => handleFinish(values, mode)}
      form={form}
      initialValues={
        selStudent && {
          fio: selStudent.fio,
          photo: selStudent.photo,
          directionOfStudyCode: selStudent.directionOfStudyCode,
          status: StudentStatus[selStudent.status],
          qualification: AcademicQualification[selStudent.qualification],
          birthday: dayjs(Number(selStudent.birthday)),
        }
      }>
      <Form.Item>
        <Button
          type="primary"
          onClick={(e) => {
            form.resetFields();
            setAddStudentForm(true);
            setEditStudentForm(false);
          }}>
          Очистить форму
        </Button>
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
      <Form.Item name="status" label="Status">
        <Select>
          {getEnumValues(StudentStatus).map((status, index) => (
            <Option key={StudentStatus[index]} value={StudentStatus[index]}>
              {StudentStatus[index]}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="qualification" label="Qualification">
        <Select>
          {getEnumValues(AcademicQualification).map((qualification, index) => {
            return (
              <Option key={AcademicQualification[index]} value={AcademicQualification[index]}>
                {AcademicQualification[index]}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {mode}
        </Button>
      </Form.Item>
    </Form>
  );
};

const ModeratorContent = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [addStudentForm, setAddStudentForm] = useState(false);
  const [editStudentForm, setEditStudentForm] = useState(false);

  const [students, setStudents] = useState<Student[]>([]);

  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  const [form] = Form.useForm();

  const sdk = new OnChainDiplomaSDK(
    undefined,
    new ethers.Wallet(
      '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
      new ethers.providers.JsonRpcProvider(),
    ),
  );

  useEffect(() => {
    const user = auth.currentUser;

    if (user !== null) {
      setLoading(false);

      sdk.getAllStudents().then((data) => {
        setStudents(data);
        // console.log(data[0]);
      });
    } else {
      // перенаправляем на страницу логина
      router.push('/login');
    }
  }, [router]);

  const handleSelectChange = (value: string) => {
    setSelectedStudent(value);
    setEditStudentForm(true);
    setAddStudentForm(false);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Form form={form}>
            <Form.Item name="mySelect" label="Выбрать студента">
              <Select value={selectedStudent} onChange={handleSelectChange} allowClear={true}>
                {students.map((student, index) => {
                  return (
                    <Option key={Number(student.id)} value={index}>
                      {student.fio} {Number(student.id)}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item>
              {!addStudentForm && (
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginRight: '20px' }}
                  onClick={() => {
                    setSelectedStudent(null);
                    setAddStudentForm(true);
                    setEditStudentForm(false);
                    form.resetFields();
                    console.log(selectedStudent);
                  }}>
                  Добавить студента в блокчейн
                </Button>
              )}
            </Form.Item>
          </Form>
          {addStudentForm && (
            <StudentForm
              students={students}
              sdk={sdk}
              setStudents={setStudents}
              mode="Добавить"
              setAddStudentForm={setAddStudentForm}
              setEditStudentForm={setEditStudentForm}
              student={selectedStudent}
            />
          )}
          {editStudentForm && (
            <StudentForm
              students={students}
              sdk={sdk}
              setStudents={setStudents}
              mode="Изменить"
              setAddStudentForm={setAddStudentForm}
              setEditStudentForm={setEditStudentForm}
              student={selectedStudent}
            />
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
