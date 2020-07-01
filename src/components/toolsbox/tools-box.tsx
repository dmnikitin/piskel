import React, { MouseEvent } from 'react';
import { connect } from 'react-redux';
import { setActiveTool, setPrimaryColor } from '../../store/ac/tools';
import { Action } from '../../store/action-types';
import { colors } from '../../assets/data';
import './tools-box.scss';

type Handler = (e: MouseEvent<HTMLButtonElement>) => Action;

type Props = {
  onSetActiveTool: (tool: number) => Action;
  onSetPrimaryColor: (color: string) => Action;
};

function ToolsBox({
  onSetActiveTool,
  onSetPrimaryColor,
}: Props): React.ReactElement {
  const activeToolHandler: Handler = (e) =>
    onSetActiveTool(Number(e.currentTarget.getAttribute('data-button')));

  const colorPickerHandler: Handler = (e) =>
    onSetPrimaryColor(String(e.currentTarget.getAttribute('data-button')));

  return (
    <div className="tools-box">
      <button data-button={0} onClick={activeToolHandler}>
        pen
      </button>
      <button data-button={1} onClick={activeToolHandler}>
        stroke
      </button>

      <button data-button={colors[1]} onClick={colorPickerHandler}>
        black
      </button>
      <button data-button={colors[2]} onClick={colorPickerHandler}>
        white
      </button>
      <button data-button={colors[3]} onClick={colorPickerHandler}>
        red
      </button>
    </div>
  );
}

export default connect(null, (dispatch) => ({
  onSetActiveTool: (tool: number) => dispatch(setActiveTool(tool)),
  onSetPrimaryColor: (color: string) => dispatch(setPrimaryColor(color)),
}))(ToolsBox);
