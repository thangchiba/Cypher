export const convertCSToTS = (csCode: string): string => {
  const cleanedCode = csCode.replace(/\s+/g, ' ').trim();
  let tsOutput: string[] = [];
  let packetType: string | null = null;

  if (cleanedCode.includes('[NeoPacket(')) {
    packetType = cleanedCode.match(/\[NeoPacket\((.+?)\)\]/)?.[1] as string;
  }

  const className = cleanedCode.match(/public class (\w+)/)?.[1];
  if (packetType && className) {
    tsOutput.push(`@DNeoPacket(${packetType})`);
    tsOutput.push(`export class ${className} extends NeoPacket {`);
  }

  const props = cleanedCode.match(/\[Key\((.+?)\)\] public (.+?) (\w+)/g);
  if (props) {
    for (const prop of props) {
      const key = prop.match(/\[Key\((.+?)\)\]/)?.[1];
      const csType = prop.match(/public (.+?) /)?.[1];
      const propName = prop.match(/public .+? (\w+)/)?.[1];

      if (key && csType && propName) {
        //@ts-ignore
        const tsType: string = csTypeToTsType[csType] || csType;
        const camelCasePropName = propName.charAt(0).toLowerCase() + propName.slice(1);
        tsOutput.push(`    @DKey(${key})`);
        tsOutput.push(`    public ${camelCasePropName} : ${tsType} = ${getDefault(tsType)};`);
      }
    }
  }

  tsOutput.push('}');
  return tsOutput.join('\n');
};

const csTypeToTsType = {
  string: 'string',
  int: 'number',
  'int[]': 'number[]',
  double: 'number',
  float: 'number',
};

const getDefault = (tsType: string) => {
  switch (tsType) {
    case 'string':
      return '""';
    case 'number[]':
      return '[]';
    default:
      return 'null';
  }
};
