export class CNeoKey {
  keyId: number;
  propertyName: string;
  propertyType: string;

  constructor(keyId: number, propertyName: string, propertyType: any) {
    this.keyId = keyId;
    this.propertyName = propertyName;
    this.propertyType = propertyType;
  }
}
