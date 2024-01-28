import classnames, {
  alignSelf,
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  boxShadow,
  display,
  justifyContent,
  padding,
  textAlign,
  textColor,
  width,
} from "tailwindcss-classnames";

interface Props {
  isCompleted: boolean;
}

const getCSS = ({ isCompleted }: Props) => {
  const button = classnames(
    padding("px-4", "py-2"),
    borderRadius("rounded-lg"),
    boxShadow("shadow-md"),
    width("w-full"),
    borderWidth("border-2"),
    display("inline-flex"),
    justifyContent("justify-center"),
    borderColor(isCompleted ? "border-accent" : "border-primary"),
    backgroundColor(isCompleted ? "bg-accent" : "bg-primary"),
  );

  const text = classnames(textColor("text-white"), textAlign("text-center"));

  const container = classnames(alignSelf("self-center"));
  return {
    button,
    text,
    container,
  };
};

export { getCSS };
