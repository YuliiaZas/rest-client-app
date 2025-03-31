import { useCallback, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { usePathname, useRouter } from 'next/navigation';

import { initializeApp } from 'firebase/app';

console.log(process.env);

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

console.log('CONFIG', firebaseConfig);

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export function useAuth() {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setIsAuthenticated(false);
        if (pathname.split('/')[1] === 'client') {
          router.push('/');
        }
        return;
      }

      setIsAuthenticated(true);
    });

    return () => unsubscribe();
  }, [router]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return response.user;
    } catch (err) {
      console.error(err);
    }
  }, []);

  const signup = useCallback(async (email: string, password: string) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return response.user;
    } catch (err) {
      console.error(err);
    }
  }, []);

  const logout = useCallback(() => {
    signOut(auth);
    router.push('/');
  }, []);

  return {
    isAuthenticated,
    login,
    signup,
    logout,
  };
}
