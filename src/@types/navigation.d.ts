import { ActivityProps } from "../screens/Activy";

export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            home: undefined;
            tools: undefined;
            profile: undefined;
            notification: undefined;
            activity: {title: string, conteudos: ActivityProps[]};
            conteudo: undefined;
            settings: undefined;
            profileSettings: undefined;
            plans: undefined;
            listMore: undefined;
            welcome: undefined;
            signin: undefined;
            signup: undefined;
            formOrder?: {requestId: number, title: string, nome: string, price: number, estado: "text-yellow-500" | "text-red-500" | "text-green-500", date: string};
            infoOrder: {id: number; title: string; description?: string; nome?: string; price: number; estado: "text-yellow-500" | "text-red-500" | "text-green-500"; date: string;};
        }
    }
}