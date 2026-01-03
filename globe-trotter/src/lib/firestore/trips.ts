import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs, orderBy, doc, getDoc, setDoc } from 'firebase/firestore';

export interface TripActivity {
    id: string;
    title: string;
    description?: string;
    cost: number;
    startTime?: string;
    duration?: string;
    category: 'transport' | 'stay' | 'activity' | 'meal';
}

export interface TripStop {
    id: string;
    city: string;
    description?: string;
    startDate: string;
    endDate: string;
    activities: TripActivity[];
    budget: number;
    image?: string;
}

export interface TripData {
    ownerId: string;
    title: string;
    description?: string;
    destination: string; // Primary destination
    startDate: string;
    endDate: string;
    budget: number;
    spent: number;
    coverImage?: string;
    isPublic: boolean;
    stops: TripStop[];
    collaborators: string[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createdAt?: any;
}

export interface UserProfile {
    uid: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    city?: string;
    country?: string;
    bio?: string;
    photoURL?: string;
    savedDestinations: string[];
}

export const createTrip = async (trip: TripData) => {
    try {
        const docRef = await addDoc(collection(db, 'trips'), {
            ...trip,
            createdAt: serverTimestamp(),
            collaborators: [trip.ownerId],
            stops: [], // Initialize empty
        });
        return docRef.id;
    } catch (error) {
        console.error("Error creating trip: ", error);
        throw error;
    }
};

export const getUserTrips = async (userId: string) => {
    try {
        const q = query(
            collection(db, 'trips'),
            where('collaborators', 'array-contains', userId),
            orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching trips: ", error);
        throw error;
    }
};

export const getTrip = async (tripId: string) => {
    try {
        const docRef = doc(db, 'trips', tripId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as TripData & { id: string };
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching trip: ", error);
        throw error;
    }
};

export const updateTrip = async (tripId: string, data: Partial<TripData>) => {
    try {
        const docRef = doc(db, 'trips', tripId);
        await setDoc(docRef, data, { merge: true });
    } catch (error) {
        console.error("Error updating trip: ", error);
        throw error;
    }
};

export const addStopToTrip = async (tripId: string, stop: TripStop) => {
    try {
        const docRef = doc(db, 'trips', tripId);
        const tripSnap = await getDoc(docRef);
        if (tripSnap.exists()) {
            const stops = (tripSnap.data().stops || []) as TripStop[];
            await setDoc(docRef, { stops: [...stops, stop] }, { merge: true });
        }
    } catch (error) {
        console.error("Error adding stop: ", error);
        throw error;
    }
};
