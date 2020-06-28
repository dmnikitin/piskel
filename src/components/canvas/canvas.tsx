import React, {ReactElement, MouseEvent, MutableRefObject, useRef} from 'react';
import './canvas.scss';

type CanvasElement = HTMLCanvasElement | null;
type CanvasRef = MutableRefObject<CanvasElement>;
type getCanvasMetaDataFunc = (canvasRef: CanvasRef) => CanvasMetaData;
type detectCurrentPixelFunc = (e: MouseEvent) => number;
type drawFunc = (canvasRef: CanvasRef) => (e: MouseEvent) => void;
interface CanvasMetaData {
  canvas: CanvasElement;
  ctx: CanvasRenderingContext2D | null;
}

const pixelSize = 32;

const drawPixel: (ctx: CanvasRenderingContext2D | null, pixel: number) => void = (ctx, pixel) => {

  const x: number = (pixel % pixelSize) * 16;
  const y: number = Math.floor(pixel / pixelSize) * 16;  
  if (ctx) {
    const p = ctx.getImageData(x, y, 1, 1).data.join('');    
    const black = '000255';    
    if (p !== black) {
      ctx.fillStyle = '#000000';
      ctx.fillRect(x, y, 16, 16);
      console.log('draw');
    }
  }
}

const detectCurrentPixel: detectCurrentPixelFunc = (e) => {
  const { nativeEvent: { offsetX: x, offsetY: y } } = e;
  return pixelSize * Math.floor(y / (pixelSize / 2)) + Math.floor(x / (pixelSize / 2));
};

const getCanvasMetaData: getCanvasMetaDataFunc = (canvasRef) => {
  const { current: canvas }  = canvasRef;
  const ctx: CanvasRenderingContext2D | null = (canvas as HTMLCanvasElement).getContext('2d');
  return { canvas, ctx };
};

function Canvas(): ReactElement {

  const canvasRef: CanvasRef = useRef(null);

  const draw: drawFunc = (ref) => (e) => {
    const {ctx}: CanvasMetaData = getCanvasMetaData(ref);
    const pixel: number = detectCurrentPixel(e);
    drawPixel(ctx, pixel);
  };

  return (
    <div className='canvas'>
      <canvas
        height={512}
        width={512}
        ref={canvasRef}
        onClick={draw(canvasRef)}
      ></canvas>
    </div>
  );
}

export default Canvas;
