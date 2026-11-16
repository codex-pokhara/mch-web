import { useContext } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Button } from '@/components/ui/button';
import AuthContext from '@/contexts/auth';
import { usePageTitle } from '@/hooks/usePageTitle';
import { baseRequest } from '@/lib/base';
import { readLocalStorage } from '@/lib/utils';

async function logout() {
    const response = await baseRequest({
        url: '/logout',
        method: 'POST',
        body: { token: readLocalStorage('refresh-token') },
        contentType: 'application/json',
    });
    return response;
}

function Dashboard() {
    usePageTitle('Account');
    const { state, logout: clearSession } = useContext(AuthContext);
    const mutation = useMutation({
        mutationFn: logout,
        onSettled: () => {
            clearSession();
            toast('Signed out');
        },
    });

    return (
        <MaxWidthWrapper className="py-20 md:py-28">
            <h1 className="text-4xl text-ink">
                Signed in as
                {' '}
                {state?.name}
                .
            </h1>
            <Button variant="outline" className="mt-8" onClick={() => mutation.mutate()} disabled={mutation.isPending}>
                {mutation.isPending ? 'Signing out…' : 'Sign out'}
            </Button>
        </MaxWidthWrapper>
    );
}

export default Dashboard;
