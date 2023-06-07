import LayoutMain from '@/components/Layout';
import { Select } from 'antd';
import React from 'react';

const onChange = (value: string) => {
  console.log(`selected ${value}`);
};

const onSearch = (value: string) => {
  console.log('search:', value);
};

const SearchContent: React.FC = () => (
  <div
    style={{
      justifyContent: 'center',
      height: '100%',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
    <p>Поиск диплома</p>
    <div>
      <Select
        showSearch
        placeholder="Select a person"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        options={[
          {
            value: 'jack',
            label: 'Jack',
          },
          {
            value: 'lucy',
            label: 'Lucy',
          },
          {
            value: 'tom',
            label: 'Tom',
          },
        ]}
      />
    </div>
  </div>
);

const Search = () => {
  return <LayoutMain childComponent={<SearchContent />} />;
};
export default Search;
