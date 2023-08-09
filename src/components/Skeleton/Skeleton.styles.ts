import classnames, {
  alignItems,
  animation,
  backgroundColor,
  borderRadius,
  flex,
  height,
  justifyContent,
  margin,
  overflow,
  width,
} from "tailwindcss-classnames";
import { Props } from "./Skeleton";

export const getCSS = ({ size, isFullyRounded }: Omit<Props, "width">) => {
  const container = classnames(
    flex("flex-1"),
    justifyContent("justify-center"),
    alignItems("items-center"),
    backgroundColor("bg-gray-200"),
    margin("my-4"),
    animation("animate-pulse"),
    borderRadius(isFullyRounded ? "rounded-full" : "rounded-lg"),
  );

  const skeletonSize = {
    small: classnames(height("h-5"), width("w-1/2")),
    medium: classnames(height("h-7"), width("w-3/4")),
    large: classnames(height("h-9"), width("w-full")),
  };

  const wrapper = classnames(
    skeletonSize[size!],
    animation("animate-pulse"),
    backgroundColor("bg-gray-200"),
    overflow("overflow-hidden"),
    borderRadius(isFullyRounded ? "rounded-full" : "rounded-lg"),
  );

  return { container, wrapper };
};
