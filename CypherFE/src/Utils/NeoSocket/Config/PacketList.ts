import {IdentityDemand} from '../NeoPackets/Auth/IdentityDemand';
import {NeoCache} from '../NeoSocketLib/Cache/NeoCache';
import {IdentityReply} from '../NeoPackets/Auth/IdentityReply';
import {TestDemandReply} from '../NeoPackets/Test/TestDemandReply';
import {TestDemand} from '../NeoPackets/Test/TestDemand';
import {TestCommand} from '../NeoPackets/Test/TestCommand';
import {EnterChatRoomDemand} from '../NeoPackets/Test/EnterChatRoomDemand';
import {EnterChatRoomReply} from '../NeoPackets/Test/EnterChatRoomReply';
import {MessageDTO} from '../NeoPackets/Test/MessageDTO';
import {NewUserConnectedCommand} from '../NeoPackets/Test/NewUserConnectedCommand';
import {NewUserGreetingCommand} from '../NeoPackets/Test/NewUserGreetingCommand';
import {UserDisconnectedCommand} from '../NeoPackets/Test/UserDisconnectedCommand';
import {Pong} from '../NeoPackets/PingPong/Pong';
import {Ping} from '../NeoPackets/PingPong/Ping';
import {ReconnectPacket} from "../NeoPackets/Auth/ReconnectPacket";

export function cachePackets() {
    const listPackets = [
        IdentityDemand,
        IdentityReply,
        TestDemand,
        TestDemandReply,
        TestCommand,
        EnterChatRoomDemand,
        EnterChatRoomReply,
        MessageDTO,
        NewUserConnectedCommand,
        NewUserGreetingCommand,
        UserDisconnectedCommand,
        Ping,
        Pong,
        ReconnectPacket,
    ];
    NeoCache.registPackets(listPackets);
}
