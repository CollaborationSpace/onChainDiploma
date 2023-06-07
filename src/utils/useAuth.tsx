// import firebase from 'firebase/app';
// import 'firebase/auth';
// import { useEffect, useState } from 'react';

// const useAuth = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
//       if (authUser) {
//         // Пользователь аутентифицирован
//         setUser(authUser);
//       } else {
//         // Пользователь не аутентифицирован
//         setUser(null);
//       }
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   return { user, loading };
// };

// export default useAuth;
