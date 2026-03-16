'use client';

import { ServiceSchema } from '@/validators/ServiceSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { createContext, useContext } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import z from 'zod';

type ServiceFormType = z.infer<typeof ServiceSchema>;

interface ServiceFormContextProps {
  form: UseFormReturn<ServiceFormType>;
}

const ServiceFormContext = createContext<ServiceFormContextProps | undefined>(
  undefined,
);

export const useServiceForm = () => {
  const context = useContext(ServiceFormContext);
  if (!context)
    throw new Error('useServiceForm must be used within ServiceFormProvider');
  return context;
};

export const ServiceFormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const form = useForm<ServiceFormType, undefined, ServiceFormType>({
    resolver: zodResolver(ServiceSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      price: '',
      category: '',
      confirmed: false,
    },
  });

  return (
    <ServiceFormContext.Provider value={{ form }}>
      {children}
    </ServiceFormContext.Provider>
  );
};
