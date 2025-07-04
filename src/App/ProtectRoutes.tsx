import { useContext } from 'react';
import {
    Navigate,
    Outlet,
} from 'react-router-dom';

import AuthContext from '@/contexts/auth';

function ProtectedRoutes() {
    const auth = useContext(AuthContext);
    // eslint-disable-next-line no-extra-boolean-cast
    return !!auth.state ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;
