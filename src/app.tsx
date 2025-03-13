import { Link, useRouter } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Button } from './components/ui/button';
import { auth } from './lib/firebase';
import { signOut } from 'firebase/auth';

export default function App() {
  const { t, i18n } = useTranslation();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.navigate({ to: '/' });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <div className="space-x-4">
          <Link to="/" className="text-blue-600 hover:underline">
            {t('dashboard')}
          </Link>
          <Link to="/tenants" className="text-blue-600 hover:underline">
            {t('tenants')}
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <div>
            <Button
              variant="outline"
              onClick={() => i18n.changeLanguage('en')}
              disabled={i18n.language === 'en'}
            >
              English
            </Button>
            <Button
              variant="outline"
              onClick={() => i18n.changeLanguage('es')}
              disabled={i18n.language === 'es'}
            >
              Español
            </Button>
          </div>
          <Button onClick={handleLogout}>{t('logout')}</Button>
        </div>
      </nav>
      <div className="p-6">
        <router.Router />
      </div>
    </div>
  );
}
