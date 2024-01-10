// import { ExtensionCodec } from '@msgpack/msgpack';
// import { Vector2 } from '../../../Model/Vector2';
//
// export const extensionCodec = new ExtensionCodec();
//
// const VECTOR2_TYPE = 1;
//
// extensionCodec.register({
//   type: VECTOR2_TYPE,
//   encode: (object: any): Uint8Array | null => {
//     if (typeof object === 'object' && 'x' in object && 'y' in object) {
//       // Convert the x and y values into a Uint8Array
//       const buffer = new ArrayBuffer(2 * Float64Array.BYTES_PER_ELEMENT);
//       const view = new Float64Array(buffer);
//       view[0] = object.x;
//       view[1] = object.y;
//       return new Uint8Array(buffer);
//     } else {
//       return null;
//     }
//   },
//   decode: (data: Uint8Array): Vector2 => {
//     const arr = new Float64Array(
//       data.buffer,
//       data.byteOffset,
//       data.byteLength / Float64Array.BYTES_PER_ELEMENT,
//     );
//     return { x: arr[0], y: arr[1] };
//   },
// });
