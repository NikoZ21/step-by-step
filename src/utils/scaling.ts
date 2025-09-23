import { Dimensions, PixelRatio } from "react-native";

const DESIGN_WIDTH = 448;
const DESIGN_HEIGHT = 997;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export const scaleWidth = (size: number) =>
  (SCREEN_WIDTH / DESIGN_WIDTH) * size;

export const scaleHeight = (size: number) =>
  (SCREEN_HEIGHT / DESIGN_HEIGHT) * size;
