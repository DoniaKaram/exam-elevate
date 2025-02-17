"use client"
import { Form, FormItem, FormMessage } from "@/components/ui/form";
import { useTranslations } from "next-intl";
import {SubmitHandler, useForm} from "react-hook-form"
import { FormField} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FeedbackMessage from "@/components/common/feedback-message";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import google_pic from '../../../../../../public/assets/Google Button (1).png'
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from "next-auth/react";
import Link from "next/link";
function LoginForm() {
  const t=useTranslations();
   const [error,setError]=useState<string|null>(null);
    const Schema=z.object({
        email:z.string({required_error:t("email-required")}).min(1,t("email-required")),
        password:z.string({required_error:t("password-required")}).min(1,t("password-required"))
    });
    type inputs=z.infer<typeof Schema>
    const form = useForm<inputs>({
      resolver: zodResolver(Schema),
      defaultValues: {
        email: '',
        password: '',
      },
    })
   const onSubmit:SubmitHandler<inputs>=async(values)=>{
    setError(null)
 
   const response=await signIn('credentials',{
    ...values,
    redirect:false
   })
   console.log(response);
   if(response?.ok){
     window.location.href=response.url||'/dashboard'
      return;
   }
  
   //setError(response?.error)//
   };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="min-w-[410px] flex flex-col  gap-5">
        <FormField
        name="email"
        control={form.control}
        render={({field})=><FormItem>
         
          <Input {...field} placeholder={t('email-placeholder')} />
          <FormMessage/>
        </FormItem>}
        />
        <FormField
        name="password"
        control={form.control}
        render={({field})=><FormItem>
          
          <Input type="password" {...field} placeholder={t('password-placeholder')}/>
          <FormMessage/>
        </FormItem>}
        />
        
        <Link href={'/auth/ForgetPassword'} className="text-[#4461F2] text-end">Recover Password?</Link>
        
        <Button className="rounded-full p-7 bg-[#4461F2] text-white">{t("Sign in")}</Button>
        <p className="text-center">Or Continue with</p>
        <div className="flex justify-center items-center gap-">
         <Image src={google_pic} alt="google-img"/>
        </div>
        <div className="flex flex-col gap-2 mt-8">
          <FeedbackMessage>{error}</FeedbackMessage>
        </div>
      </form>

    </Form>

  );
}

export default LoginForm;
