import { useContext } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import AuthContext from '@/contexts/auth';
import { baseRequest } from '@/lib/base';

interface SuccessProps{
    data: {
        message:string;
    }
}

const logout = async (body: unknown) => {
    const response = await baseRequest({
        url: '/logout',
        method: 'POST',
        body: JSON.stringify(body),
        contentType: 'application/json',
    });

    return response;
};

function Dashboard() {
    const { logout: userLogout } = useContext(AuthContext);
    const logoutMutation = useMutation({
        mutationFn: logout,
        onSuccess: (data: SuccessProps) => {
            toast(data.data.message);
            userLogout();
        },
        onError: (error: unknown) => {
            toast((error as Error).message);
        },
    });

    const handleLogout = () => {
        logoutMutation.mutate({ token: localStorage.getItem('refresh-token') });
    };
    return (
        <div><Button onClick={handleLogout}>Logout</Button></div>
    );
}

export default Dashboard;
