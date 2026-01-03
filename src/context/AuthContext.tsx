'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import {
    onAuthStateChanged,
    User,
    GoogleAuthProvider,
    signInWithPopup,
    signOut as firebaseSignOut
} from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
    error: string | null;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Check if Firebase is properly initialized
        if (!auth || typeof onAuthStateChanged !== 'function') {
            console.warn('Firebase auth not properly initialized. Using demo mode.');
            // Use setTimeout to avoid synchronous setState in effect
            setTimeout(() => setLoading(false), 0);
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser && db) {
                try {
                    // Create user in Firestore if not exists
                    const userRef = doc(db, 'users', currentUser.uid);
                    const userSnap = await getDoc(userRef);

                    if (!userSnap.exists()) {
                        await setDoc(userRef, {
                            uid: currentUser.uid,
                            email: currentUser.email,
                            displayName: currentUser.displayName,
                            photoURL: currentUser.photoURL,
                            createdAt: new Date(),
                        });
                    }
                } catch (error) {
                    console.error('Error creating user document:', error);
                }
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
        setError(null);

        if (!auth) {
            const errorMsg = 'Firebase authentication is not configured. Please follow the setup guide in FIREBASE_SETUP.md';
            setError(errorMsg);
            throw new Error(errorMsg);
        }

        try {
            const provider = new GoogleAuthProvider();
            // Add custom parameters for better UX
            provider.setCustomParameters({
                prompt: 'select_account'
            });

            const result = await signInWithPopup(auth, provider);
            console.log('Successfully signed in:', result.user.email);
        } catch (error: unknown) {
            console.error('Google sign-in error:', error);

            // Provide user-friendly error messages
            let errorMessage = 'Failed to sign in. Please try again.';

            if (error && typeof error === 'object' && 'code' in error) {
                const firebaseError = error as { code: string; message: string };
                switch (firebaseError.code) {
                    case 'auth/popup-closed-by-user':
                        errorMessage = 'Sign-in cancelled. Please try again.';
                        break;
                    case 'auth/popup-blocked':
                        errorMessage = 'Pop-up blocked. Please allow pop-ups for this site.';
                        break;
                    case 'auth/invalid-api-key':
                        errorMessage = 'Firebase is not configured correctly. Please check FIREBASE_SETUP.md';
                        break;
                    case 'auth/network-request-failed':
                        errorMessage = 'Network error. Please check your connection.';
                        break;
                    case 'auth/unauthorized-domain':
                        errorMessage = 'This domain is not authorized. Please add it in Firebase Console.';
                        break;
                    default:
                        errorMessage = firebaseError.message || errorMessage;
                }
            }

            setError(errorMessage);
            throw new Error(errorMessage);
        }
    };

    const logout = async () => {
        setError(null);

        if (!auth) {
            console.warn('Firebase auth not available for logout');
            return;
        }

        try {
            await firebaseSignOut(auth);
            console.log('Successfully signed out');
        } catch (error) {
            console.error('Logout error:', error);
            const errorMessage = 'Failed to sign out. Please try again.';
            setError(errorMessage);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, signInWithGoogle, logout, error }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
