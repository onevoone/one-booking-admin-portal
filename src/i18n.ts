import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// English translations
const enTranslations = {
	welcome: 'Welcome to One Booking Admin Portal',
	dashboard: 'Dashboard',
	tenants: 'Tenants',
	subscriptions: 'Subscriptions',
	users: 'Users',
	trainers: 'Trainers',
	checkins: 'Check-Ins',
	payments: 'Payments',
	logout: 'Logout',
	login: 'Login',
	email: 'Email',
	password: 'Password',
	totalUsers: 'Total Users',
	totalCheckIns: 'Total Check-Ins',
	totalRevenue: 'Total Revenue',
	addTenant: 'Add Tenant',
};

// Spanish translations
const esTranslations = {
	welcome: 'Bienvenido al Portal de Administración de One Boking',
	dashboard: 'Tablero',
	tenants: 'Inquilinos',
	subscriptions: 'Suscripciones',
	users: 'Usuarios',
	trainers: 'Entrenadores',
	checkins: 'Registros de Entrada',
	payments: 'Pagos',
	logout: 'Cerrar Sesión',
	login: 'Iniciar Sesión',
	email: 'Correo Electrónico',
	password: 'Contraseña',
	totalUsers: 'Total de Usuarios',
	totalCheckIns: 'Total de Registros de Entrada',
	totalRevenue: 'Ingresos Totales',
	addTenant: 'Agregar Inquilino',
};

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			en: { translation: enTranslations },
			es: { translation: esTranslations },
		},
		fallbackLng: 'en',
		interpolation: {
			escapeValue: false,
		},
	});

export default i18n;
