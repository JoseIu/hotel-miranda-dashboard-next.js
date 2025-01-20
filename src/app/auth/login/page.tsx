import { auth } from '@/auth';
import { LogoHotel } from '@/components/icons/LogoHotel';
import { redirect } from 'next/navigation';
import { LoginForm } from './LoginForm';
import './loginPage.scss';

const SigInPage = async () => {
  const session = await auth();

  if (session?.user) {
    redirect('/');
  }

  return (
    <section className="auth-login">
      <div className="auth-container wrapper">
        <div className="auth-container__left">
          <LogoHotel className="auth-container__logo" />
          <h2 className="auth-container__title">Access the Hotel Miranda admin dashboard</h2>
          <p className="auth-container__subtitle">
            Our customers rate us 4.5 out of 5 stars based on 3200+ reviews!
          </p>
        </div>

        <div className="auth-container__right">
          <LoginForm />
        </div>
      </div>
      <div className="auth-login__background"></div>
    </section>
  );
};

export default SigInPage;
