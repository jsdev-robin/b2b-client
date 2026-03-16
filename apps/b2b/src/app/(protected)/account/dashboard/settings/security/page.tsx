import SignInMethods from '@/components/site/protected/pages/settings/security/SignInMethods';
import TwoFactorMethods from '@/components/site/protected/pages/settings/security/TwoFactorMethods';

const SecurityPage = () => {
  return (
    <>
      <SignInMethods />
      <TwoFactorMethods />
    </>
  );
};

export default SecurityPage;
