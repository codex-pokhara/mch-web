import {
    useContext,
    useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import {
    Eye,
    EyeOff,
} from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Button } from '@/components/ui/button';
import AuthContext from '@/contexts/auth';
import { usePageTitle } from '@/hooks/usePageTitle';
import { baseRequest } from '@/lib/base';
import { setLocalStorage } from '@/lib/utils';

const loginSchema = z.object({
    email_or_username: z.string().trim().min(1, 'Enter your email or username.'),
    password: z.string().min(1, 'Enter your password.'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginPayload {
    token: string;
    refresh: string;
    detail?: string;
    user: { id: string; username: string };
}

async function login(body: LoginFormData) {
    const response = await baseRequest({
        url: '/login',
        method: 'POST',
        body,
        contentType: 'application/json',
    });
    const data = response.data as LoginPayload;
    if (!response.ok) {
        throw new Error(data?.detail || 'That email and password did not match.');
    }
    return data;
}

const inputClass = 'h-11 w-full rounded-[3px] border border-ink/25 bg-sheet px-3 text-ink focus:border-airmail-navy focus:outline-none aria-[invalid=true]:border-airmail-red';

export default function Login() {
    usePageTitle('Staff sign in');
    const [isVisible, setIsVisible] = useState(false);
    const { login: userLogin } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

    const mutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            setLocalStorage('refresh-token', data.refresh);
            userLogin(data.token, { id: data.user.id, name: data.user.username });
            toast.success('Signed in');
        },
        onError: (error) => toast.error(error.message),
    });

    return (
        <MaxWidthWrapper className="flex justify-center py-20 md:py-28">
            <div className="w-full max-w-sm">
                <h1 className="text-4xl text-ink">Staff sign in.</h1>
                <p className="mt-3 text-ink-soft">For the OHCDS team only.</p>
                <form onSubmit={handleSubmit((values) => mutation.mutate(values))} noValidate className="mt-10 flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="login-user" className="postal text-ink-soft">Email or username</label>
                        <input
                            id="login-user"
                            type="text"
                            autoComplete="username"
                            aria-invalid={!!errors.email_or_username}
                            aria-describedby={errors.email_or_username ? 'login-user-error' : undefined}
                            className={inputClass}
                            {...register('email_or_username')}
                        />
                        {errors.email_or_username && (
                            <p id="login-user-error" className="text-sm text-airmail-red">{errors.email_or_username.message}</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="login-password" className="postal text-ink-soft">Password</label>
                        <div className="relative">
                            <input
                                id="login-password"
                                type={isVisible ? 'text' : 'password'}
                                autoComplete="current-password"
                                aria-invalid={!!errors.password}
                                aria-describedby={errors.password ? 'login-password-error' : undefined}
                                className={`${inputClass} pr-11`}
                                {...register('password')}
                            />
                            <button
                                type="button"
                                className="absolute top-1/2 right-1 flex size-9 -translate-y-1/2 items-center justify-center rounded-[3px] text-ink-soft hover:text-ink"
                                onClick={() => setIsVisible((visible) => !visible)}
                                aria-label={isVisible ? 'Hide password' : 'Show password'}
                            >
                                {isVisible ? <EyeOff className="size-4" strokeWidth={1.75} /> : <Eye className="size-4" strokeWidth={1.75} />}
                            </button>
                        </div>
                        {errors.password && <p id="login-password-error" className="text-sm text-airmail-red">{errors.password.message}</p>}
                    </div>
                    <Button type="submit" variant="ink" className="w-full" disabled={mutation.isPending}>
                        {mutation.isPending ? 'Signing in…' : 'Sign in'}
                    </Button>
                </form>
            </div>
        </MaxWidthWrapper>
    );
}
