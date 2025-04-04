'use client';

import type { ChangeEvent } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/common/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/common/components/ui/form';
import { Input } from '@/common/components/ui/input';
import { authClient } from '@/core/auth/auth.client';
import {
  authFormSchema,
  loginRequestSchema,
  registerRequestSchema,
} from '@/core/auth/auth.schema';

import type { AuthForm } from '@/core/auth/auth.schema';

type AuthFormMode = 'login' | 'register';
type AuthFormMetadata = {
  title: string;
  description: string;
  submitLabel: string;
  linkDescription: string;
  linkLabel: string;
  linkUrl: string;
};
type AuthFormHeading = Record<AuthFormMode, AuthFormMetadata>;

const heading: AuthFormHeading = {
  login: {
    title: 'Login to your account',
    description: 'Enter your email below to login to your account',
    submitLabel: 'Login',
    linkDescription: "Don't have an account?",
    linkLabel: 'Register',
    linkUrl: '/register',
  },
  register: {
    title: 'Create an account',
    description: 'Enter your email below to create an account',
    submitLabel: 'Register',
    linkDescription: 'Already have an account?',
    linkLabel: 'Login',
    linkUrl: '/login',
  },
};

type AuthFormProps = {
  mode?: AuthFormMode;
};

export function AuthForm({ mode = 'login' }: AuthFormProps) {
  const router = useRouter();
  const form = useForm<AuthForm>({
    defaultValues: {
      mode,
      name: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(authFormSchema),
  });

  function handleFieldChange(
    field: { onChange: (value: string) => void },
    fieldName: keyof AuthForm,
  ) {
    return function (e: ChangeEvent<HTMLInputElement>) {
      field.onChange(e.target.value);
      form.clearErrors(fieldName);
    };
  }

  async function handleLogin(values: AuthForm) {
    const result = loginRequestSchema.safeParse(values);
    if (!result.success) {
      // TODO: show error message
      console.log(result.error);

      return;
    }

    const { error } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
    });

    if (error) {
      // TODO: show error message
      return;
    }

    router.replace('/');
  }

  async function handleRegister(values: AuthForm) {
    const result = registerRequestSchema.safeParse(values);
    if (!result.success) {
      // TODO: show error message
      console.log(result.error);

      return;
    }

    const { error } = await authClient.signUp.email({
      email: result.data.email,
      password: result.data.password,
      name: result.data.name,
    });

    if (error) {
      // TODO: show error message
      return;
    }

    router.replace('/login');
  }

  async function onSubmit(values: AuthForm) {
    if (values.mode === 'login') {
      await handleLogin(values);
    }

    if (values.mode === 'register') {
      await handleRegister(values);
    }
  }

  // TODO: improve form layout shift when switching between login and register
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">{heading[mode].title}</h1>
          <p className="text-muted-foreground text-sm text-balance">
            {heading[mode].description}
          </p>
        </div>
        <div className="grid gap-6">
          {mode === 'register' ? (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="John Doe"
                      onChange={handleFieldChange(field, 'name')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : null}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="m@example.com"
                    onChange={handleFieldChange(field, 'email')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Password
                  {mode === 'login' ? (
                    <Link
                      href="/"
                      className="ml-auto text-sm font-normal underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  ) : null}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="••••••••"
                    type="password"
                    onChange={handleFieldChange(field, 'password')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            {heading[mode].submitLabel}
          </Button>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or continue with
            </span>
          </div>
          <Button disabled variant="outline" className="w-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                fill="currentColor"
              />
            </svg>
            Login with GitHub
          </Button>
        </div>
        <div className="flex items-center justify-center gap-1 text-sm">
          {heading[mode].linkDescription}{' '}
          <Link
            href={heading[mode].linkUrl}
            className="underline underline-offset-4"
          >
            {heading[mode].linkLabel}
          </Link>
        </div>
      </form>
    </Form>
  );
}
