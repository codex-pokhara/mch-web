import { useContext } from 'react';
import {
    Navigate,
    Outlet,
} from 'react-router-dom';

import AuthContext from '@/contexts/auth';

function ProtectedRoutes() {
    const { state, status } = useContext(AuthContext);
    if (status === 'checking') {
        return null;
    }
    return state ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoutes;
