import { IdentityDemand } from '../NeoPackets/Auth/IdentityDemand';
import { NeoCache } from '../NeoSocketLib/Cache/NeoCache';
import { IdentityReply } from '../NeoPackets/Auth/IdentityReply';

export function cachePackets() {
  const listPackets = [IdentityDemand, IdentityReply];
  NeoCache.registPackets(listPackets);
}
