import { IdentityDemand } from '../NeoPackets/Auth/IdentityDemand';
import { NeoCache } from '../NeoSocketLib/Cache/NeoCache';
import { IdentityReply } from '../NeoPackets/Auth/IdentityReply';
import { TestDemandReply } from '../NeoPackets/Test/TestDemandReply';
import { TestDemand } from '../NeoPackets/Test/TestDemand';

export function cachePackets() {
  const listPackets = [IdentityDemand, IdentityReply, TestDemand, TestDemandReply];
  NeoCache.registPackets(listPackets);
}
