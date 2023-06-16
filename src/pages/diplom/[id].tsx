import LayoutMain from '@/components/Layout';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import OnChainDiplomaSDK from '../../../blockchain/sdk';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import axios from 'axios';

const DiplomContent: FC = () => {
  const [diplom, setDiplom] = useState<any>();
  const [pageId, setPageId] = useState<any>();

  const test = new OnChainDiplomaSDK();

  const router = useRouter();

  useEffect(() => {
    // вывести текущей ur);

    router.query.id &&
      test.getStudentById(router.query.id).then((res) => {
        setDiplom(res);
        setPageId(router.query.id);
        console.log(res);
      });
  }, [pageId]);


  const handleFileUpload = async (file) => {
    // Проверка типа файла
    if (file.type !== 'application/pdf') {
      message.error('Пожалуйста, загрузите файл в формате PDF!');
      return false;
    }

    console.log(file);


    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/upload', formData);
      console.log('Загруженные файлы:', response.data.fileName);
      // Обработка успешной загрузки файла
    } catch (error) {
      console.error('Ошибка загрузки файла:', error);
      // Обработка ошибки загрузки файла
    }

    // Загрузка файла на сервер
    // Ваш код обработки загрузки файла

    return false; // Чтобы предотвратить автоматическую загрузку файла на сервер в этом примере
  };


  const { Dragger } = Upload;
  return (
    <>
      <div>Страница диплома</div>
      <div>fkdjfkj</div>
      <Dragger name="file" multiple={false} beforeUpload={handleFileUpload} showUploadList={true}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Нажмите или перетащите файл для загрузки</p>
        <p className="ant-upload-hint">Поддерживается только формат PDF</p>
      </Dragger>
    </>
  );
};

const Diplom = ({ params }) => {
  return <LayoutMain childComponent={<DiplomContent />} />;
};

export default Diplom;
