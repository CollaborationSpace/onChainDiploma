import LayoutMain from '@/components/Layout';
import { message, Select } from 'antd';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import OnChainDiplomaSDK, { Student } from '../../blockchain/sdk';
const onChange = (value: string) => {
  // console.log(`selected ${value}`);
};

const onSearch = (value: string) => {
  // console.log('search:', value);
};

const SearchContent: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
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
  const handleOptionSelect = (value) => {
    message.loading('Загрузка диплома');
    const arr = value.split(' ');
    console.log(arr[arr.length - 1]);
    router.push(`/diplom/${arr[arr.length - 1]}`);
  };
  return (
    <div
      style={{
        // justifyContent: 'center',
        height: '100%',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <div
        style={{
          // justifyContent: 'center',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <h1
          style={{
            marginBottom: '40px',
            textAlign: 'center',
            fontSize: '36px',
            fontFamily: 'GolosTextWebRegular',
          }}>
          Поиск диплома
        </h1>
        {/* <Select
          showSearch
          placeholder="Select a person"
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
        /> */}

        <Select
          showSearch
          placeholder="Найти диплом"
          onChange={onChange}
          size="large"
          onChange={handleOptionSelect}
          style={{ width: '300px' }}>
          {students.map((student, index) => {
            return (
              <Option
                key={student.fio}
                value={`${student.fio} ${student.title} ${Number(student.id)}`}
                onClick={() => {
                  console.log('click');
                }}>
                <p> {student.fio} </p>
                <p> {student.title} </p>
              </Option>
            );
          })}
        </Select>
      </div>
    </div>
  );
};

const Search = () => {
  return <LayoutMain childComponent={<SearchContent />} />;
};
export default Search;
