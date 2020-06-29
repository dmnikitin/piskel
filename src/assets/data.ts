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
enum colorsRGBA {
  '#e3e4e6' = '227228230255',
  '#000000' = '000255',
  '#ffffff' = '255255255255',
  // 3: '#d61818',
  // 4: '#13c219',
  // 5: '#0249ba',
  // 6: '#d5d900',
  // 7: '#d98200',
  // 8: '#760fbf',
}

enum tools {
  pen,
  stroke,
  colorPicker,
  eraser,
  bucket,
  allToOneColor,
}

interface ActiveState {
  colors: { primaryColor: string; alternativeColor: string };
  activeTool: number;
}

const active: ActiveState = {
  colors: {
    primaryColor: colors[1],
    alternativeColor: colors[0],
  },
  activeTool: tools.pen,
};

export { colors, colorsRGBA, tools, active, mouseEvents };
