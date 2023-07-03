import { useContext } from "react";
import { AuthContext, AuthContextDataProps } from "../context/AuthProvider";


export function useAuth(): AuthContextDataProps {
    const context = useContext(AuthContext);

    return context;
}