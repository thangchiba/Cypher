export class HeaderFlags {
  public IsDemand: boolean;
  public IsReply: boolean;
  public IsReliable: boolean;
  public IsStateLess: boolean;
  public IsEncrypted: boolean;
  public Flag6: boolean;
  public Flag7: boolean;
  /**
   * More than 64kb or not
   */
  public IsBigSize: boolean;

  constructor() {
    this.IsDemand = false;
    this.IsReply = false;
    this.IsReliable = false;
    this.IsStateLess = false;
    this.IsEncrypted = false;
    this.Flag6 = false;
    this.Flag7 = false;
    this.IsBigSize = false;
  }

  public static Serialize(flags: HeaderFlags): number {
    let result = 0;
    if (flags.IsDemand) result |= 1 << 0;
    if (flags.IsReply) result |= 1 << 1;
    if (flags.IsReliable) result |= 1 << 2;
    if (flags.IsStateLess) result |= 1 << 3;
    if (flags.IsEncrypted) result |= 1 << 4;
    if (flags.Flag6) result |= 1 << 5;
    if (flags.Flag7) result |= 1 << 6;
    if (flags.IsBigSize) result |= 1 << 7;
    return result;
  }

  public static Deserialize(b: number): HeaderFlags {
    const flags = new HeaderFlags();
    flags.IsDemand = (b & (1 << 0)) !== 0;
    flags.IsReply = (b & (1 << 1)) !== 0;
    flags.IsReliable = (b & (1 << 2)) !== 0;
    flags.IsStateLess = (b & (1 << 3)) !== 0;
    flags.IsEncrypted = (b & (1 << 4)) !== 0;
    flags.Flag6 = (b & (1 << 5)) !== 0;
    flags.Flag7 = (b & (1 << 6)) !== 0;
    flags.IsBigSize = (b & (1 << 7)) !== 0;
    return flags;
  }
}
