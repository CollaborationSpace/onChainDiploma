import { Button, Form, Input } from 'antd';
import 'firebase/auth';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { auth } from '@/config/firebase';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {useParams} from 'next/navigation';
import { Alert, Space } from 'antd';

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [errorLogin, setErrorLogin] = useState(false);
    
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

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setLoading(false);
        setErrorLogin(false);

        // ...
      })
      .catch((error) => {
        setLoading(false);

        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorLogin(true);
        console.log('Ошибка входа в систему:', error);

      });
  };

  return (
    <div
      style={{ display: 'flex', height: '500px', justifyContent: 'start', alignItems: 'center', flexDirection: 'column', gap: '50%' }}>
        <Space direction="vertical" style={{ width: '100%' }}>
        {errorLogin && <Alert message="Ошибка входа в систему" type="error" />}
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
            Войти
          </Button>
        </Form.Item>
        <Form.Item>
            <Link href="/registration">Регистрация</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
