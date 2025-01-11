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
import { Link } from "lucide-react";
function RegisterForm() {
  const t=useTranslations();
   const [error,setError]=useState<string|null>(null);
    const Schema=z.object({
        username:z.string({required_error:t("username-required")}).min(2,t("username-validation")),
        firstName:z.string({required_error:t("password-required")}).min(1,t("password-validation")),
        lastName:z.string({required_error:t("lastName-required")}).min(1,t("lastName-validation")),
        email:z.string({required_error:t("email-required")}).min(1,t("email-validation")),
        password:z.string({required_error:t("password-required")}).min(1,t("password-validation")),
        rePassword:z.string({required_error:t("rePassword-required")}).min(1,t("rePassword-validation")),
        phone:z.string({required_error:t("phone-required")}).min(1,t("phone-validation")),
    });
    type inputs=z.infer<typeof Schema>
    const form = useForm<inputs>({
      resolver: zodResolver(Schema),
      defaultValues: {
        username: '',
        firstName: '',
    lastName:'',
    email:'',
    password:'',
    rePassword:'',
    phone:'',
      }
    })
   const onSubmit:SubmitHandler<inputs>=async(values)=>{
      console.log(values);
   }
 
   //setError(response?.error)//
   
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="min-w-[410px] flex flex-col  gap-5">
        <FormField
        name="username"
        control={form.control}
        render={({field})=><FormItem>
         
          <Input {...field} placeholder={t('username-placeholder')} />
          <FormMessage/>
        </FormItem>}
        />
        <FormField
        name="firstName"
        control={form.control}
        render={({field})=><FormItem>
          
          <Input  {...field} placeholder={t('first-name')}/>
          <FormMessage/>
        </FormItem>}
        />
        <FormField
        name="lastName"
        control={form.control}
        render={({field})=><FormItem>
         
          <Input {...field} placeholder={t('lastName-placeholder')} />
          <FormMessage/>
        </FormItem>}
        />
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
         
          <Input {...field} placeholder={t('password-placeholder')} />
          <FormMessage/>
        </FormItem>}
        />
        <FormField
        name="rePassword"
        control={form.control}
        render={({field})=><FormItem>
         
          <Input {...field} placeholder={t('rePassword-placeholder')} />
          <FormMessage/>
        </FormItem>}
        />
        <FormField
        name="phone"
        control={form.control}
        render={({field})=><FormItem>
         
          <Input {...field} placeholder={t('phone-placeholder')} />
          <FormMessage/>
        </FormItem>}
        />
        <a className="text-primary text-end">Already have an account?<Link href='/auth/login'>login</Link></a>
        <Button className="rounded-full p-7">{t("Sign up")}</Button>
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

export default RegisterForm;
