'use client'
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { schema } from '@/schema/registerSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as zod from "zod";

export default function Regester() {
   const [isLoading, setisLoading] = useState(false)
  const form=useForm({
    defaultValues :{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:'',

    },
    resolver:zodResolver(schema),
    mode:'onBlur'
  })

  function submitForm(values:zod.infer<typeof schema>){
    setisLoading(true);
  }
  return (
    <>
      <div className="w-1/2 bg-gray-300 p-10 m-auto mt-2">
      <h2 className='text-green-600 font-bold text-4xl'>Register</h2>
        <form onSubmit={form.handleSubmit(submitForm)}>
          <div className="mt-4">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Name:</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your Name"
                    className="bg-white"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="mt-4">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Email:</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your Email"
                    className="bg-white"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="mt-4">
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Password:</FieldLabel>
                  <Input
                    type='password'
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your Password"
                    className="bg-white"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="mt-4">
            <Controller
              name="rePassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>rePassword:</FieldLabel>
                  <Input
                    type="password"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your Password again"
                    className="bg-white"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="mt-4">
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>phone:</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your phone number"
                    className="bg-white"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <Button disabled={isLoading} type="submit" className="mt-7 w-full">
            {isLoading ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 animate-spin"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </div>
    </>
  );
}
