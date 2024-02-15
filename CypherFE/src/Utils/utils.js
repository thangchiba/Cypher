import { NeoCache } from './NeoSocket/NeoSocketLib/Cache/NeoCache';

export default function generateJsonSchemaFromCache(packetName) {
  const packetInfo = NeoCache.packetByName[packetName];
  if (!packetInfo) {
    throw new Error(`Packet definition for '${packetName}' not found.`);
  }

  const schema = {
    type: 'object',
    properties: {},
    title: packetInfo.packetTypeName,
  };

  packetInfo.keys.forEach((key) => {
    if (isPrimitiveType(key.propertyType)) {
      schema.properties[key.propertyName] = { type: mapTypeToSchemaType(key.propertyType) };
    } else {
      // Recursive call for nested objects
      schema.properties[key.propertyName] = generateJsonSchemaFromCache(key.propertyType);
    }
  });

  return schema;
}

function isPrimitiveType(type) {
  // Adjust this function according to your type system
  const primitiveTypes = ['string', 'number', 'boolean', 'integer'];
  return primitiveTypes.includes(type.toLowerCase());
}

function mapTypeToSchemaType(type) {
  // Map your types to JSON schema types; this might need customization
  switch (type.toLowerCase()) {
    case 'string':
      return 'string';
    case 'number':
      return 'number';
    case 'integer':
      return 'integer';
    case 'boolean':
      return 'boolean';
    default:
      return type; // Default or throw error
  }
}

export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export function jsonToClassInstance(jsonObject, ClassType) {
  let instance = new ClassType();

  const convertValue = (value) => {
    if (Array.isArray(value)) {
      // Recursively process each element of the array
      return value.map((item) => convertValue(item));
    } else if (typeof value === 'string' && !isNaN(value)) {
      // Convert string to number if it's numeric
      return parseFloat(value);
    } else if (typeof value === 'object' && value !== null) {
      // Recursively process each property if it's an object
      let newObj = {};
      for (let key in value) {
        newObj[key] = convertValue(value[key]);
      }
      return newObj;
    } else {
      // Return the value as is for other types
      return value;
    }
  };

  for (let prop in jsonObject) {
    if (jsonObject.hasOwnProperty(prop)) {
      instance[prop] = convertValue(jsonObject[prop]);
    }
  }

  return instance;
}
