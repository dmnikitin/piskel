import React, {
  ReactElement,
  MouseEvent,
  MutableRefObject,
  useRef,
  useEffect,
} from 'react';
import { connect } from 'react-redux';
import { dimensions, colors, colorsRGBA, ToolsState } from '../../assets/data';
import { ActiveState } from '../../assets/data';
import './canvas.scss';

type CanvasElement = HTMLCanvasElement | null;
type CanvasContext = CanvasRenderingContext2D | null;
type CanvasRef = MutableRefObject<CanvasElement>;
type GetCanvasMetaDataFunc = (canvasRef: CanvasRef) => CanvasMetaData;
type DetectCurrentPixelFunc = (e: MouseEvent<HTMLCanvasElement>) => number;
type DrawFunc = (e: MouseEvent<HTMLCanvasElement>) => void;
type DrawPixelFunc = (ctx: CanvasContext, pixel: number, color: string) => void;
interface CanvasMetaData {
  canvas: CanvasElement;
  ctx: CanvasContext;
}

const {
  pixel: { medium: pixelSize },
  canvas: { medium: canvasSize },
} = dimensions;

const drawPixel: DrawPixelFunc = (ctx, pixel, color) => {
  const x: number = (pixel % pixelSize) * (pixelSize / 2);
  const y: number = Math.floor(pixel / pixelSize) * (pixelSize / 2);
  if (ctx) {
    const imageData: Uint8ClampedArray = ctx.getImageData(x, y, 1, 1).data;
    const index: number = colorsRGBA.findIndex(
      (e) =>
        e ===
        `${imageData[0]}${imageData[1]}${imageData[2]}${imageData[3] / 255}`
    );
    if (colors[index] !== color) {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, pixelSize / 2, pixelSize / 2);
    }
  }
};

const detectCurrentPixel: DetectCurrentPixelFunc = (e) => {
  const {
    nativeEvent: { offsetX: x, offsetY: y },
  } = e;
  return (
    pixelSize * Math.floor(y / (pixelSize / 2)) +
    Math.floor(x / (pixelSize / 2))
  );
};

const getCanvasMetaData: GetCanvasMetaDataFunc = (ref) => {
  const { current: canvas } = ref;
  const ctx: CanvasContext = canvas ? canvas.getContext('2d') : null;
  return { canvas, ctx };
};

function Canvas(props: ToolsState): ReactElement {
  const { activeTool, alternativeColor, primaryColor } = props;
  const canvasRef: CanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const { ctx } = getCanvasMetaData(canvasRef);
    if (ctx) {
      ctx.fillStyle = colors[2];
      ctx.fillRect(0, 0, canvasSize, canvasSize);
    }
  }, []);

  const draw: DrawFunc = (e) => {
    // ref
    const { ctx } = getCanvasMetaData(canvasRef);
    const pixel: number = detectCurrentPixel(e);
    drawPixel(ctx, pixel, primaryColor);
  };

  const actionHandler = (e: MouseEvent<HTMLCanvasElement>) => {
    const { ctx } = getCanvasMetaData(canvasRef);
    const pixel: number = detectCurrentPixel(e);
  };

  return (
    <div className="canvas">
      <canvas
        height={canvasSize}
        width={canvasSize}
        ref={canvasRef}
        onClick={draw}
      ></canvas>
    </div>
  );
}

export default connect((state: ActiveState) => ({
  primaryColor: state.tools.primaryColor,
  alternativeColor: state.tools.alternativeColor,
  activeTool: state.tools.activeTool,
}))(Canvas);
