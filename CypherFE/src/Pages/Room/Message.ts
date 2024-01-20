interface Message {
  UserName: string;
  DecodedUserName: string;
  Content: string;
  DecodedContent: string;
  CreatedAt: Date;
  isSender: boolean;
}
