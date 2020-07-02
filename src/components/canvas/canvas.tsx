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

const useStroke = (ctx, x1, y1, x2, y2) => {
  let x;
  let y;
  let xDominant;
  let yDominant;
  let iterator;
  const deltaX = x2 - x1;
  const deltaY = y2 - y1;
  const positiveDeltaX = Math.abs(deltaX);
  const positiveDeltaY = Math.abs(deltaY);
  let errorIntervalX = 2 * positiveDeltaY - positiveDeltaX;
  let errorIntervalY = 2 * positiveDeltaX - positiveDeltaY;

  if (positiveDeltaY <= positiveDeltaX) {
    if (deltaX >= 0) {
      x = x1;
      y = y1;
      xDominant = x2;
    } else {
      x = x2;
      y = y2;
      xDominant = x1;
    }

    const e = { layerX: x, layerY: y };
    usePen(e, ctx, primaryColor);

    for (iterator = 0; x < xDominant; iterator += 1) {
      x += 1;
      if (errorIntervalX < 0) {
        errorIntervalX += 2 * positiveDeltaY;
      } else {
        if ((deltaX < 0 && deltaY < 0) || (deltaX > 0 && deltaY > 0)) {
          y += 1;
        } else {
          y -= 1;
        }
        errorIntervalX += 2 * (positiveDeltaY - positiveDeltaX);
      }
      const e2 = { layerX: x, layerY: y };
      usePen(e2, ctx, primaryColor);
    }
  } else {
    if (deltaY >= 0) {
      x = x1;
      y = y1;
      yDominant = y2;
    } else {
      x = x2;
      y = y2;
      yDominant = y1;
    }
    const e = { layerX: x, layerY: y };
    usePen(e, ctx, primaryColor);

    for (iterator = 0; y < yDominant; iterator += 1) {
      y += 1;
      if (errorIntervalY <= 0) {
        errorIntervalY += 2 * positiveDeltaX;
      } else {
        if ((deltaX < 0 && deltaY < 0) || (deltaX > 0 && deltaY > 0)) {
          x += 1;
        } else {
          x -= 1;
        }
        errorIntervalY += 2 * (positiveDeltaX - positiveDeltaY);
      }
      const e2 = { layerX: x, layerY: y };
      usePen(e2, ctx, primaryColor);
    }
  }
};

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
