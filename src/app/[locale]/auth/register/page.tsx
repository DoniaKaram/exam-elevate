import React from 'react';
//import { useTranslations } from 'use-intl';
import RegisterForm from './_components/register-form';
import Header from '../_components/header';
import { useTranslations } from 'next-intl';
function Page() {
 
    const t=useTranslations();
    return (
    
      <section className='flex justify-center flex-col p-8 gap-6'>
         <Header/>
        <div className='mt-[110px]'>
        <h2 className='text-xl font-bold mb-3'>{t('register-submit')}</h2>
       <RegisterForm/>
        </div>
       
      </section>
    
  );
}

export default Page;
