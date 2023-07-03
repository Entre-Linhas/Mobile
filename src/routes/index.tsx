import { Box } from 'native-base';

import { Loading } from '../components/Loading';
import { AuthRoutes } from './AuthRoutes';
import { Routes } from './TabBottoms';
import { useAuth } from '../hooks/useAuth';

export default () => {
    const { isUserLoading, signed } = useAuth();
    // const user = auth.signed;

    return (
        <Box flex={1} _light={{bgColor: "coolGray.100"}} fontFamily="Nunito.mono" _dark={{bgColor: "gray.900"}}>
            {isUserLoading ? <Loading /> : signed ? <Routes /> : <AuthRoutes />}
        </Box>
    )
}