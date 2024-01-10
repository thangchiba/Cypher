import 'reflect-metadata';

// Decorator for HandlerMethod
export function DHandlerMethod(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
  Reflect.defineMetadata(`CHandlerMethod-${propertyKey}`, true, target, propertyKey);
  // console.log("METAKEY " + `CHandlerMethod-${propertyKey}`);
  // const paramTypes = Reflect.getMetadata('design:paramtypes', target, propertyKey)
}
