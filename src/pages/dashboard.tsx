import { Payment } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export default function Dashboard() {
	const { t } = useTranslation();

	const fetchMetrics = async () => {
		const [usersSnapshot, checkInsSnapshot, paymentsSnapshot] = await Promise.all([
			getDocs(collection(db, 'users')),
			getDocs(collection(db, 'checkIns')),
			getDocs(collection(db, 'payments')),
		]);

		return {
			totalUsers: usersSnapshot.size,
			totalCheckIns: checkInsSnapshot.size,
			totalRevenue: paymentsSnapshot.docs.reduce((sum, doc) => {
				const payment = doc.data() as Payment;
				return sum + (payment.amount || 0);
			}, 0),
		};
	};

	const { data, error, isLoading } = useQuery({
		queryKey: ['dashboardMetrics'],
		queryFn: fetchMetrics,
	});

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {(error as Error).message}</div>;

	return (
		<div>
			<h1 className="text-2xl font-bold mb-6">{t('dashboard')}</h1>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<Card>
					<CardHeader>
						<CardTitle>{t('totalUsers')}</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-3xl font-semibold">{data?.totalUsers}</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>{t('totalCheckIns')}</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-3xl font-semibold">{data?.totalCheckIns}</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>{t('totalRevenue')}</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-3xl font-semibold">${data?.totalRevenue.toFixed(2)}</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
