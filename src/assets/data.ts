enum mouseEvents {
  mousedown,
  mouseup,
  mousemove,
  mouseout,
}

enum colors {
  '#e3e4e6',
  '#000000',
  '#ffffff',
  '#d61818',
  '#13c219',
  '#0249ba',
  '#d5d900',
  '#d98200',
  '#760fbf',
}

const colorsRGBA: Array<string> = [
  '2272282301',
  '0000',
  '2552552551',
  '21424241',
  '19194251',
  '2731861',
  '21321701',
  '21713001',
  '118151911',
];

enum tools {
  pen,
  stroke,
  colorPicker,
  eraser,
  bucket,
  allToOneColor,
}

const toolstState: ToolsState = {
  primaryColor: colors[1],
  alternativeColor: colors[0],
  activeTool: tools.pen,
};

interface Dimensions {
  coeff: { [prop: string]: number };
  canvas: { [prop: string]: number };
  pen: { [prop: string]: number };
  pixel: { [prop: string]: number };
}

const dimensions: Dimensions = {
  coeff: {
    basic: 1,
    fullPage: 0.5,
    preview: 4,
  },
  canvas: {
    small: 128,
    medium: 512,
    large: 1024,
  },
  pen: {
    small: 1,
    medium: 2,
    large: 3,
  },
  pixel: {
    medium: 32,
  },
};

export interface ToolsState {
  primaryColor: string;
  alternativeColor: string;
  activeTool: number;
}

export interface ActiveState {
  tools: ToolsState;
}

export { colors, colorsRGBA, tools, mouseEvents, toolstState, dimensions };
