import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { urlSignalR } from "../utils/api-link";

var connection: HubConnection;
const connectionServer = (token: string) => {
  const newConnection = new HubConnectionBuilder()
    .withUrl(`${urlSignalR}/notificationHub`, {
      accessTokenFactory: () => token,
    })
    .withAutomaticReconnect()
    .build();
  connection = newConnection;
  return newConnection;
};

const signalRService = {
  connectionServer,
};
export default signalRService;
