import { auth } from '@/config/firebase';
import { Button, Form, Input } from 'antd';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Alert, Space } from 'antd';

const Registration = () => {
  const [loading, setLoading] = useState(false);
  const [errorReg, setErrorReg] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Проверка статуса аутентификации пользователя
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Пользователь уже аутентифицирован, выполните перенаправление на нужную страницу
        router.push('/');
      }
    });

    // Отписка от обновлений аутентификации
    return () => unsubscribe();
  }, [router]);

  const handleLogin = (values) => {
    setLoading(true);
    const { email, password } = values;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setLoading(false);
        setErrorReg(false);
        // ...
      })
      .catch((error) => {
        setLoading(false);

        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorReg(true);

        console.log('Ошибка входа в систему:', error);
      });
  };
  return (
    <div
      style={{ display: 'flex', height: '500px', justifyContent: 'start', alignItems: 'center', flexDirection: 'column', gap: '50%' }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          {errorReg && <Alert message="Ошибка регистрации" type="error" />}
        </Space>
      <Form onFinish={handleLogin}>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Пожалуйста, введите ваш email!' },
            { type: 'email', message: 'Пожалуйста, введите корректный email!' },
          ]}>
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Пожалуйста, введите ваш пароль!' }]}>
          <Input.Password placeholder="Пароль" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Зарегистрироваться
          </Button>
        </Form.Item>
        <Form.Item>
          <Link href="/login">Ввойти</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Registration;
