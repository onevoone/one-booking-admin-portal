import { FirebaseOptions, initializeApp } from 'firebase/app';
import { Subscription, Tenant, Trainer, User } from '@/types';
import { getAuth } from 'firebase/auth';
import * as admin from 'firebase-admin';
import { QueryDocumentSnapshot } from 'firebase/firestore';

const config: FirebaseOptions = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
	databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
};

const app = initializeApp(config);
const adminApp = admin.initializeApp(config);

export const auth = getAuth(app);

// This helper function pipes your types through a firestore converter
const converter = <T>() => ({
	toFirestore: (data: Partial<T>) => data,
	fromFirestore(snapshot: QueryDocumentSnapshot) { // notice how there's no options here
		const data = snapshot.data();

		return {
			id: snapshot.id,
			...data as Omit<T, "id">,
		};
	},
})

// This helper function exposes a 'typed' version of firestore().collection(collectionPath)
// Pass it a collectionPath string as the path to the collection in firestore
// Pass it a type argument representing the 'type' (schema) of the docs in the collection
const dataPoint = <T>(collectionPath: string) =>
	adminApp.firestore().collection(collectionPath).withConverter(converter<T>())

export const db = {
	users: dataPoint<User>('users'),
	tenants: dataPoint<Tenant>('tenants'),
	subscriptions: dataPoint<Subscription>('subscriptions'),
	trainers: dataPoint<Trainer>('trainers'),
}
