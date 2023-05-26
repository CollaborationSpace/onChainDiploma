import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyB3DJC5xebYKIAWxogzQstqz4UzwxIItO8',
  authDomain: 'onchaindiploma.firebaseapp.com',
  projectId: 'onchaindiploma',
  storageBucket: 'onchaindiploma.appspot.com',
  messagingSenderId: '652034819650',
  appId: '1:652034819650:web:336c142fc2b24f0ee44fdb',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
