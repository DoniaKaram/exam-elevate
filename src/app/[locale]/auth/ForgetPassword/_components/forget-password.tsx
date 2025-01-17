"use client"
import { Form, FormItem, FormMessage } from "@/components/ui/form";
import { useTranslations } from "next-intl";
import {SubmitHandler, useForm} from "react-hook-form"
import { FormField} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import google_pic from '../../../../../../public/assets/Google Button (1).png'
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
function ForgetPassword() {
    const t=useTranslations();
    const Schema=z.object({
          email:z.string({required_error:t("email-required")}).min(1,t("email-required")),
          
      });
      type inputs=z.infer<typeof Schema>
      const form = useForm<inputs>({
        resolver: zodResolver(Schema),
        defaultValues: {
          email: ''
        },
      });
       const onSubmit:SubmitHandler<inputs>=async(values)=>{
         console.log(values);
        
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
      <Button className="rounded-full p-7 bg-primary">{t("Sign in")}</Button>
      <p className="text-center">Or Continue with</p>
      <div className="flex justify-center items-center gap-">
       <Image src={google_pic} alt="google-img"/>
      </div>
     
    </form>

  </Form>
    
  );
}

export default ForgetPassword;
