/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from 'react';
import {
    useCallback,
    useContext,
    useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import {
    EyeIcon,
    EyeOffIcon,
} from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthContext from '@/contexts/auth';
import { baseRequest } from '@/lib/base';
import { cn } from '@/lib/utils';

interface LoginResponse {
  ok: boolean,
  data: {
    token: string,
    refresh: string,
    detail?: string,
    user: {
      id: string;
      username: string;
      email: string;
    };
  };
  message?: string;
}
interface ApiError {
  message: string;
}
const login = async (body: any) => {
    const response = await baseRequest({
        url: '/login',
        method: 'POST',
        body: JSON.stringify(body),
        contentType: 'application/json',
    });

    return response;
};
const loginSchema = z.object({
    email_or_username: z.string().min(1, 'Invalid email address'),
    password: z.string().min(1, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>

export default function Login({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
    const [isVisible, setIsVisible] = useState(false);
    const { login: userLogin } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const togglePasswordVisibility = useCallback(() => {
        setIsVisible((prev) => !prev);
    }, []);

    const loginMutation = useMutation<LoginResponse, ApiError, LoginFormData>({
        mutationFn: login,
        onSuccess: (data) => {
            if (data?.ok) {
                userLogin(data.data.token, {
                    id: data.data.user.id,
                    name: data.data.user.username,
                });
                localStorage.setItem('refresh-token', data.data.refresh);
                toast.success(data.message || 'Login successful');
            } else {
                toast.error(data.data.detail || 'Login failed');
            }
        },
        onError: (error) => {
            toast.error(error.message || 'An error occurred during login');
        },
    });

    const onSubmit = (formData: LoginFormData) => {
        loginMutation.mutate(formData);
    };

    return (
        <div className="flex justify-center items-center pb-24 pt-[160px]">
            <div className={cn('flex flex-col gap-6 w-full max-w-sm justify-center ', className)} {...props}>
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">Welcome back</CardTitle>
                        <CardDescription>Login with your Google account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid gap-6">
                                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                    <span className="relative z-10 bg-background px-2 text-muted-foreground">Or continue with</span>
                                </div>
                                <div className="grid gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="text"
                                            placeholder="m@example.com"
                                            {...register('email_or_username')}
                                            className={cn({
                                                'focus-visible:ring-red-500': errors.email_or_username,
                                            })}
                                        />
                                        {errors.email_or_username && <span className="text-sm text-red-500">{errors.email_or_username.message}</span>}
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">Password</Label>
                                            <Link to="/forgot-password" className="ml-auto text-sm underline-offset-4 hover:underline">
                                                Forgot your password?
                                            </Link>
                                        </div>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                type={isVisible ? 'text' : 'password'}
                                                {...register('password')}
                                                className={cn({
                                                    'focus-visible:ring-red-500': errors.password,
                                                })}
                                            />
                                            <button
                                                type="button"
                                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:text-muted-foreground focus:outline-none"
                                                onClick={togglePasswordVisibility}
                                                aria-label={isVisible ? 'Hide password' : 'Show password'}
                                            >
                                                {isVisible ? <EyeIcon className="h-4 w-4" /> : <EyeOffIcon className="h-4 w-4" />}
                                            </button>
                                        </div>
                                        {errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}
                                    </div>
                                    <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
                                        {loginMutation.isPending ? 'Logging in...' : 'Login'}
                                    </Button>
                                </div>
                                <div className="text-center text-sm">
                                    Don&apos;t have an account?
                                    {' '}
                                    <Link to="/sign-up" className="underline underline-offset-4">
                                        Sign up
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
                <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
                    By clicking continue, you agree to our
                    {' '}
                    <Link to="/terms-of-service">Terms of Service</Link>
                    {' '}
                    and
                    {' '}
                    <Link to="/privacy-policy">Privacy Policy</Link>
                    .
                </div>
            </div>
        </div>
    );
}
