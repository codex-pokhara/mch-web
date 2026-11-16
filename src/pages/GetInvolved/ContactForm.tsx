import {
    type ComponentProps,
    type ReactNode,
} from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Send } from 'lucide-react';
import { z } from 'zod';

import Postmark from '@/components/Postal/Postmark';
import { Button } from '@/components/ui/button';
import { contact } from '@/constants';
import { postContactMessage } from '@/lib/api';
import { cn } from '@/lib/utils';

const schema = z.object({
    name: z.string().trim().min(1, 'Please tell us your name.'),
    email: z.string().trim().email('That email address does not look right.'),
    phone: z.string().trim().optional(),
    message: z.string().trim().min(10, 'Please write a little more, at least a sentence.'),
});

type FormValues = z.infer<typeof schema>;

const fieldClass = cn(
    'w-full border-0 border-b border-ink/30 bg-transparent px-0 py-2.5 text-lg text-ink',
    'placeholder:text-ink-faint focus:border-airmail-navy focus:outline-none focus:ring-0',
    'aria-[invalid=true]:border-airmail-red disabled:opacity-60',
);

function Field({
    id,
    label,
    error,
    hint,
    children,
}: {
    id: string;
    label: string;
    error?: string;
    hint?: string;
    children: ReactNode;
}) {
    return (
        <div className="flex flex-col gap-1.5">
            <label htmlFor={id} className="postal text-ink-soft">{label}</label>
            {children}
            {hint && !error && <p id={`${id}-hint`} className="text-sm text-ink-faint">{hint}</p>}
            {error && <p id={`${id}-error`} className="text-sm font-medium text-airmail-red">{error}</p>}
        </div>
    );
}

function describedBy(id: string, hasError: boolean, hasHint = false): ComponentProps<'input'>['aria-describedby'] {
    if (hasError) {
        return `${id}-error`;
    }
    return hasHint ? `${id}-hint` : undefined;
}

function ContactForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            message: '',
        },
    });

    const mutation = useMutation({
        mutationFn: postContactMessage,
        onSuccess: () => reset(),
    });

    if (mutation.isSuccess) {
        return (
            <div className="flex flex-col items-start gap-6" role="status">
                <Postmark ringTop="SENT · DADAGAUN" small="THANK" big="YOU" className="w-28 -rotate-12" />
                <div>
                    <p className="font-sans text-2xl font-bold text-ink [font-stretch:112.5%]">Your letter is on its way.</p>
                    <p className="mt-2 max-w-[44ch] text-ink-soft">
                        Thank you for writing. Someone from the family will reply to you by email,
                        usually within a few days.
                    </p>
                </div>
                <Button variant="outline" onClick={() => mutation.reset()}>Write another message</Button>
            </div>
        );
    }

    const pending = mutation.isPending;

    return (
        <form onSubmit={handleSubmit((values) => mutation.mutate(values))} noValidate className="flex flex-col gap-7">
            <div className="grid gap-7 sm:grid-cols-2">
                <Field id="name" label="Your name" error={errors.name?.message}>
                    <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        disabled={pending}
                        aria-invalid={!!errors.name}
                        aria-describedby={describedBy('name', !!errors.name)}
                        className={fieldClass}
                        {...register('name')}
                    />
                </Field>
                <Field id="email" label="Email" error={errors.email?.message}>
                    <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        disabled={pending}
                        aria-invalid={!!errors.email}
                        aria-describedby={describedBy('email', !!errors.email)}
                        className={fieldClass}
                        {...register('email')}
                    />
                </Field>
            </div>
            <Field id="phone" label="Phone (optional)" hint="Include your country code if you are outside Nepal.">
                <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    disabled={pending}
                    aria-describedby={describedBy('phone', false, true)}
                    className={fieldClass}
                    {...register('phone')}
                />
            </Field>
            <Field id="message" label="Your message" error={errors.message?.message}>
                <textarea
                    id="message"
                    rows={5}
                    disabled={pending}
                    aria-invalid={!!errors.message}
                    aria-describedby={describedBy('message', !!errors.message)}
                    placeholder="I would like to sponsor a child, volunteer, or visit in…"
                    className={cn(fieldClass, 'resize-y leading-relaxed')}
                    {...register('message')}
                />
            </Field>

            {mutation.isError && (
                <div role="alert" className="border-t-2 border-airmail-red pt-4">
                    <p className="font-medium text-ink">{mutation.error.message}</p>
                    <p className="mt-1 text-ink-soft">
                        You can also email us at
                        {' '}
                        <a className="text-airmail-red underline" href={`mailto:${contact.email}`}>{contact.email}</a>
                        .
                    </p>
                </div>
            )}

            <Button type="submit" variant="stamp" size="lg" disabled={pending} className="w-full sm:w-fit">
                <Send strokeWidth={1.75} />
                {pending ? 'Sending…' : 'Send your letter'}
            </Button>
        </form>
    );
}

export default ContactForm;
