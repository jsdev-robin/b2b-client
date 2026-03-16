'use client';

import { useState } from 'react';
import PasskeyRegister from './particles/PasskeyRegister';
import PasskeySuccessState from './particles/PasskeySuccessState';

const StartPasskeysRegistration = () => {
  const [step, setStep] = useState<number>(1);

  return (
    <section>
      <div className="wrapper max-w-2xl mx-auto">
        <div className="space-y-4">
          {step === 1 && <PasskeyRegister setStep={setStep} />}
          {step === 2 && <PasskeySuccessState />}
        </div>
      </div>
    </section>
  );
};

export default StartPasskeysRegistration;
