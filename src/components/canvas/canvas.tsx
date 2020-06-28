import React, {ReactElement, MutableRefObject, useRef} from 'react';
import './canvas.scss';


function Canvas(): ReactElement {

  const canvasRef: MutableRefObject<HTMLCanvasElement | null> = useRef(null);

 

  return (
    <div className='canvas'>
      <canvas
        id='canvas'
        ref={canvasRef}
      ></canvas>
    </div>
  );
}

export default Canvas;
