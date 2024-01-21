// import { NeoClient } from '../../Utils/NeoSocket/NeoSocketLib/NeoClient';
//
// export class Client {
//   private static neoClient: NeoClient | null = null;
//
//   private static initializeClient(): NeoClient {
//     if (!Client.neoClient) {
//       Client.neoClient = new NeoClient();
//       // Additional setup or configuration if needed
//     }
//     return Client.neoClient;
//   }
//
//   public static sendDemand(data: any): void {
//     const neoClient = Client.initializeClient();
//     // Implement your demand logic here using neoClient
//   }
//
//   public static sendCommand(data: any): void {
//     const neoClient = Client.initializeClient();
//     // Implement your command logic here using neoClient
//   }
//
//   public static autoReconnect(): void {
//     const neoClient = Client.initializeClient();
//     // Implement your auto-reconnect logic here using neoClient
//   }
//
//   public static reconnect(): void {
//     const neoClient = Client.initializeClient();
//     // Implement your reconnect logic here using neoClient
//   }
// }
