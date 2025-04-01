import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import { initializeApp } from 'firebase/app';
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export async function firebaseLogin(email: string, password: string) {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return response.user;
  } catch (err) {
    console.error(err);
  }
}

export async function firebaseSignup(email: string, password: string) {
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
}

export function firebaseLogout() {
  signOut(auth);
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          email: 'Email',
          type: 'text',
          placeholder: 'email@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('loginError');
        }

        const firebaseUser = await firebaseLogin(
          credentials.email,
          credentials.password
        );

        if (firebaseUser) {
          return { id: firebaseUser.uid, email: firebaseUser.email };
        } else {
          throw new Error('invalidCredentials');
        }
      },
    }),
  ],
};
