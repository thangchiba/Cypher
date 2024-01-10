import React from 'react';
import { Box } from '@mui/system';

interface ImageBoxProps {
  url: string;
  width: number;
  height: number;
  alt: string;
}

const ImageBox: React.FC<ImageBoxProps> = (props: ImageBoxProps) => {
  return (
    <Box
      component="img"
      sx={{
        height: props.height,
        width: props.width,
      }}
      alt={props.alt}
      src={props.url}
    />
  );
};
export default ImageBox;
