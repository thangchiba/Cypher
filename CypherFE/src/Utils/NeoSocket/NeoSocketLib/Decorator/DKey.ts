import 'reflect-metadata'; // Import this once at the entry point of your application

export function DKey(index: number) {
  return function (target: any, key: string) {
    // console.log("target,key is : ",target,key,index);
    Reflect.defineMetadata('DKey:' + key, index, target);
  };
}
