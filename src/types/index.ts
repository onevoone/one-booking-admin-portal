import { GeoPoint } from 'firebase/firestore';

export interface Tenant {
	id: string;
	name: string;
	address: string;
	contactEmail: string;
	phoneNumber: string;
	logo: string;
	location: GeoPoint;
	createdAt: string;
}

export interface Subscription {
	id: string;
	amountOfTraining: string;
	description: string;
	durationDays: number;
	fullName: string;
	name: string;
	numberOfGuestVisits: number;
	price: number;
	type: 'single' | 'group';
	tenantId: string;
	createdAt: string;
}

export interface User {
	phoneNumber: string;
	instagramLink: string;
	photo: string;
	subscriptionId: string;
	tenantId: string;
	createdAt: string;
}

export interface Trainer {
	id: string;
	name: string;
	email: string;
	phoneNumber: string;
	specialty: string;
	tenantId: string;
	photo: string;
	availability: string[];
	createdAt: string;
}

export interface CheckIn {
	userId: string;
	tenantId: string;
	timestamp: string;
}

export interface Payment {
	userId: string;
	subscriptionId: string;
	tenantId: string;
	amount: number;
	status: string;
	paymentDate: string;
	transactionId: string;
}
