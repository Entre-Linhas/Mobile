import { createContext, useState, useEffect } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store';
import { useToast } from "native-base";
import { api } from "../services/api";
import { ManagementProps } from "../screens/Tools/Management";


interface UserProps {
    idUsuario: number;
    nome: string;
    sobrenome: string;
    email: string;
    senha: string;
    endereco: string;
    dataInicio: string;
    dataTermino: string;
    progresso: any;
    cpf: string;
    cnpj: string;
    plano: any;
}

interface ProfileProps {
    idPerfil: number;
    nivel: number;
    conquista: number;
    pontuacoes: number;
    servico: string;
    daily: string;
    combo: number;
    maxCombo: number;
    progresso: any;
    foto: string;
    usuario: UserProps;
    trilhas: any;
    ferramentas: any;
    describe: string;
}

interface AtividadesProps {
    idAtividade: number,
    nomeAtividade: string;
    status: string;
    progresso: number;
    conteudo: any;
    materia: any;
    pratica: any;
    dica: any;
}

export interface AuthContextDataProps {
    signed: boolean;
    perfil: ProfileProps;
    atividades: any;
    user: UserProps;
    pedido: ManagementProps[]
    isUserLoading: boolean;
    nivelamento: any;
    setNivelamento: Function;
    setIsUserLoading: Function;
    setNewPerfil: Function;
    definirRedeSocial: Function;
    incrementrarProgressoAtividade: Function;
    atualizarAtividade: Function;
    setAtividades: Function;
    avançarQuest: Function;
    criarRedesSociais: Function;
    setUser: Function;
    setPedido: Function;
    setPerfil: Function;
    setSigned: Function;
    signIn: () => Promise<void>;
    signUp: (id: number) => Promise<void>;
    signOut: () => Promise<void>;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthProvider({ children }: AuthProviderProps ) {
    const [isUserLoading, setIsUserLoading] = useState<boolean>(false);
    const [signed, setSigned] = useState<boolean>(false);
    const [user, setUser] = useState({} as UserProps);
    const [perfil, setPerfil] = useState({} as ProfileProps);
    const [pedido, setPedido] = useState<ManagementProps[]>([]);
    const [nivelamento, setNivelamento] = useState(0);
    const [atividades, setAtividades] = useState<any>({ progresso: 0});
    const toast = useToast();

    useEffect(() => {
        async function loadStorage() {
            const storagedUser = await SecureStore.getItemAsync("Authuser");
            console.log("[Storaged User]",storagedUser);
            if(storagedUser !== null) {
                const userJSON = JSON.parse(storagedUser);
                setIsUserLoading(true);
                setUser(userJSON);
                try {
                    toast.show({
                        title: "Atualizando informações da sua conta...",
                        placement: "bottom"
                    })
                    await api.get("/perfis/" + userJSON.id)
                        .then((res) => {
                            if(res.data) {
                                console.log("Foi!");
                                setPerfil(res.data);
                                setAtividades(res.data.trilhas.atividades)
                                setSigned(true);
                            }
                        })
                        .catch((err) => {
                            console.log("Catchhh!", err);
                            toast.show({
                                title: "Antigo login inválido, tente novamente",
                                placement: "bottom"
                            });
                            signOut();
                        })
                } catch(err) {
                    console.log("[AuthProvider | Effect]", err); 
                    signOut();
                } finally {
                    setIsUserLoading(false);
                }
            } 
        }

        loadStorage();
    }, []);

    async function signIn() {
        try {
            setIsUserLoading(true);
            toast.show({
                title: "Entrando...",
                placement: "bottom",
                bgColor: "jade.500"
            })
            setSigned(true);
            // console.log(user)
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            console.log("[Funcion SIGNIN] | Final");
            setIsUserLoading(false);
        }
    }

    async function signUp(id: number) {
        try {
            setIsUserLoading(true);
            api.get("/perfis/" + id)
                .then((res) => {
                    if(res.data) {
                        setPerfil(res.data);
                        setAtividades(res.data.trilhas.atividades)
                        setSigned(true);
                    }
                })
            toast.show({
                title: "Cadastrando...",
                placement: "bottom",
                bgColor: "jade.500"
            })
            // console.log(user)
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            console.log("[Funcion SIGNIN] | Final");
            setIsUserLoading(false);
        }
    }

    async function signOut() {
        setIsUserLoading(true)
        await SecureStore.deleteItemAsync("Authuser");
        setUser({} as UserProps);
        toast.show({
            title: "Saindo...",
            placement: "bottom",
            bgColor: "bittersweet.700"
        })
        setSigned(false);
    }

    async function setNewPerfil(key: keyof ProfileProps, newValue: string) {
        const newPerfil = {
            ...perfil,
            [key]: newValue,
        }
        
        try {
            setIsUserLoading(true);
            await api.put(`/perfis/${newPerfil.idPerfil}`, newPerfil)
                .then((res) => {
                    if(res.data) {
                        setPerfil(newPerfil);
                        console.log(newPerfil)
                    }
                })
                .catch((err) => {
                    console.log("[PUT - AXIOS | New Perfil]", err);
                })
        } catch(err) {
            console.log("[PUT | New Perfil]", err);
        } finally {
            setIsUserLoading(false);
        }
    }

    function atualizarAtividade(newAtividade: any) {
        const idAtividade = atividades?.idAtividade;

        console.log(atividades);
        console.log("----")
        console.log("ID", idAtividade);
        api.put(`/atividades/${idAtividade}`, newAtividade)
            .then((res) => {
                if(res.data) {
                    setAtividades(res.data);
                }
            })
                .catch(err => {
                    console.log("ABC", err);
                })
    }

    async function avançarQuest() {
        const newAtividade = {
            ...atividades,
            pratica: {
                idPratica: atividades.pratica.idPratica + 1
            }
        }

        atualizarAtividade(newAtividade)
    }

    function incrementrarProgressoAtividade() {
        const newAtividade = {
            ...atividades,
            progresso: atividades.progresso + 1,
            materia: {
                idMateria: atividades.progresso  + 1
            }
        }

        atualizarAtividade(newAtividade);
    }

    async function criarRedesSociais(redes: any) {
        try {
            setIsUserLoading(true)
            await api.put("/redesocial", redes)
                .then((res) => {
                    if(res.data) {
                        setPerfil(res.data);
                    }
                })
                    .catch(err => {
                        console.log(err);
                    })
        } catch(err) {
            console.log(err);
        } finally {
            setIsUserLoading(false);
        }
    }

    function definirRedeSocial(linkProps: string) {
        const newPerfil = {
            ...perfil,
            link: linkProps,
        }
    }


    
    return (
        <AuthContext.Provider value={{ 
            signed, setSigned, 
            user, setUser, 
            signIn, signOut, signUp, 
            isUserLoading, setIsUserLoading, 
            perfil, setPerfil, setNewPerfil, criarRedesSociais, definirRedeSocial,
            setPedido, pedido, 
            avançarQuest, setAtividades, atividades, atualizarAtividade, incrementrarProgressoAtividade,
            nivelamento, setNivelamento 
        }}>
            {children}
        </AuthContext.Provider>
    )
}