import { useContext } from 'react';
import {
    Navigate,
    Outlet,
} from 'react-router-dom';

import AuthContext from '@/contexts/auth';

function PublicRoutes() {
    const auth = useContext(AuthContext);
    return !auth.state ? <Outlet /> : <Navigate to="/account" />;
}

export default PublicRoutes;
