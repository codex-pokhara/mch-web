import { useContext } from 'react';
import {
    Navigate,
    Outlet,
} from 'react-router-dom';

import AuthContext from '@/contexts/auth';

/** Routes only for signed-out visitors, such as the sign-in page. */
function PublicRoutes() {
    const { state, status } = useContext(AuthContext);
    if (status === 'checking') {
        return null;
    }
    return state ? <Navigate to="/account" replace /> : <Outlet />;
}

export default PublicRoutes;
