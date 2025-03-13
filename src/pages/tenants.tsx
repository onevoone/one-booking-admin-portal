import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { collection, getDocs, addDoc, deleteDoc, doc, GeoPoint } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Tenant } from '../types';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import React, { useState } from 'react';
import { Input } from '../components/ui/input';

export default function Tenants() {
	const { t } = useTranslation();
	const queryClient = useQueryClient();
	const [newTenant, setNewTenant] = useState({ name: '', address: '', contactEmail: '', phoneNumber: '', logo: '', location: { latitude: 0, longitude: 0 } });

	const fetchTenants = async () => {
		const snapshot = await getDocs(collection(db, 'tenants'));
		return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as unknown as Tenant[];
	};

	const { data: tenants, error, isLoading } = useQuery({
		queryKey: ['tenants'],
		queryFn: fetchTenants,
	});

	const addTenantMutation = useMutation({
		mutationFn: async (tenant: Omit<Tenant, 'createdAt' | 'id'>) => {
			await addDoc(collection(db, 'tenants'), {
				...tenant,
				createdAt: new Date().toISOString(),
				location: new GeoPoint(tenant.location.latitude, tenant.location.longitude),
			});
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tenants'] }),
	});

	const deleteTenantMutation = useMutation({
		mutationFn: async (tenantId: string) => {
			await deleteDoc(doc(db, 'tenants', tenantId));
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tenants'] }),
	});

	const handleAddTenant = (e: React.FormEvent) => {
		e.preventDefault();
		addTenantMutation.mutate(newTenant as Omit<Tenant, 'createdAt' | 'id'>);
		setNewTenant({ name: '', address: '', contactEmail: '', phoneNumber: '', logo: '', location: { latitude: 0, longitude: 0 } });
	};

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {(error as Error).message}</div>;

	return (
		<div>
			<h1 className="text-2xl font-bold mb-6">{t('tenants')}</h1>
			<form onSubmit={handleAddTenant} className="mb-6 space-y-4">
				<Input
					placeholder="Name"
					value={newTenant.name}
					onChange={(e) => setNewTenant({ ...newTenant, name: e.target.value })}
					required
				/>
				<Input
					placeholder="Address"
					value={newTenant.address}
					onChange={(e) => setNewTenant({ ...newTenant, address: e.target.value })}
					required
				/>
				<Input
					placeholder="Contact Email"
					type="email"
					value={newTenant.contactEmail}
					onChange={(e) => setNewTenant({ ...newTenant, contactEmail: e.target.value })}
					required
				/>
				<Input
					placeholder="Phone Number"
					value={newTenant.phoneNumber}
					onChange={(e) => setNewTenant({ ...newTenant, phoneNumber: e.target.value })}
					required
				/>
				<Input
					placeholder="Logo URL"
					value={newTenant.logo}
					onChange={(e) => setNewTenant({ ...newTenant, logo: e.target.value })}
				/>
				<div className="flex space-x-4">
					<Input
						placeholder="Latitude"
						type="number"
						value={newTenant.location.latitude}
						onChange={(e) => setNewTenant({ ...newTenant, location: { ...newTenant.location, latitude: Number(e.target.value) } })}
						required
					/>
					<Input
						placeholder="Longitude"
						type="number"
						value={newTenant.location.longitude}
						onChange={(e) => setNewTenant({ ...newTenant, location: { ...newTenant.location, longitude: Number(e.target.value) } })}
						required
					/>
				</div>
				<Button type="submit">{t('addTenant')}</Button>
			</form>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Name</TableHead>
						<TableHead>Address</TableHead>
						<TableHead>Contact Email</TableHead>
						<TableHead>Phone Number</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{tenants?.map((tenant) => (
						<TableRow key={tenant.id}>
							<TableCell>{tenant.name}</TableCell>
							<TableCell>{tenant.address}</TableCell>
							<TableCell>{tenant.contactEmail}</TableCell>
							<TableCell>{tenant.phoneNumber}</TableCell>
							<TableCell>
								<Button variant="destructive" onClick={() => deleteTenantMutation.mutate(tenant.id)}>
									Delete
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
