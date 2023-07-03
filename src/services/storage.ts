import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notification from "expo-notifications";
import { ManagementProps } from "../screens/Tools/Management";


export interface StorageManagementProps {
    [id: string]: {
        data: ManagementProps;
        notificationId: string;
    }
}


export async function saveManagement(order: ManagementProps) {
    try {
        const time = new Date(`${order.date}T12:00:00`);
        console.log(time)
        const now = new Date(`${new Date().toJSON().slice(0, 10)}T00:00:00`);
        console.log(now);
        const seconds = Math.abs(Math.ceil(now.getTime() - time.getTime()) / 1000);
        console.log(seconds)

        const notificationId = await Notification.scheduleNotificationAsync({
            content: {
                title: "📦 Há um pedido aqui, para hoje?",
                body: `A data de entrega do pedido ${order.title} para a cliente ${order.nome} é hoje! Desejamos uma excelente entrega.`,
                sound: true,
                priority: Notification.AndroidNotificationPriority.HIGH,
                data: {
                    order
                }
            }, 
            trigger: {
                seconds: seconds < 60 ? 60 : seconds,
                repeats: true
            },
        });

        const data = await AsyncStorage.getItem('@management:order');
        const oldOrder = data ? JSON.parse(data) as StorageManagementProps : {};
        const newOrder = {
            [order.id]: {
                data: order,
                notificationId
            }
        }

        await AsyncStorage.setItem("@management:order", JSON.stringify({...newOrder, ...oldOrder}));
        console.log("Storage Data:", "✔️");
        console.log("SAVE: ", await AsyncStorage.getItem("@management:order"));
    } catch (err) {
        throw console.error(err);
    }
}



export async function removeManagement(id: string) {
    const data = await AsyncStorage.getItem("@management:order");
    const orders = data ? (JSON.parse(data) as StorageManagementProps) : {}

    await Notification.cancelScheduledNotificationAsync(String(orders.notificationId));
    delete orders[id];

    await AsyncStorage.setItem("@management:order", JSON.stringify(orders));
}