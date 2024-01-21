import { decryptMessage as decryptMessageUtil } from './utilsTS';
import { MessageDTO } from './NeoSocket/NeoPackets/Test/MessageDTO';

export function decryptAndMapMessage(message: Message, enigma: string, nickName: string): Message {
  const decodedChatContent = decryptMessageUtil(message.Content, enigma);
  const decodedUserName = decryptMessageUtil(message.UserName, enigma);

  const decodedMessage: Message = {
    ...message,
    DecodedUserName: decodedUserName,
    DecodedContent: decodedChatContent,
    isSender: decodedUserName === nickName,
  };

  return decodedMessage;
}

export function mapDTOToMessage(messageDTO: MessageDTO, enigma: string, nickName: string): Message {
  const decodedChatContent = decryptMessageUtil(messageDTO.Content, enigma);
  const decodedUserName = decryptMessageUtil(messageDTO.UserName, enigma);
  return {
    UserName: messageDTO.UserName,
    DecodedUserName: decodedUserName,
    Content: messageDTO.Content,
    DecodedContent: decodedChatContent,
    CreatedAt: messageDTO.CreatedAt,
    isSender: decodedUserName === nickName,
  };
}

export function mapDTOsToMessage(messageDTOs: MessageDTO[], enigma: string, nickName: string): Message[] {
  return messageDTOs.map((messageDTO: any) => {
    const decodedChatContent = decryptMessageUtil(messageDTO[1], enigma);
    const decodedUserName = decryptMessageUtil(messageDTO[0], enigma);
    return {
      UserName: messageDTO[0],
      DecodedUserName: decodedUserName,
      Content: messageDTO[1],
      DecodedContent: decodedChatContent,
      CreatedAt: messageDTO[2],
      isSender: decodedUserName === nickName,
    };
  });
}
