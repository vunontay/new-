import "./button.css";

// -----------------Buttons Variant----------------
const buttonVariants = {
  default: "btn-default",
  destructive: "btn-destructive",
  outline: "btn-outline",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
  link: "btn-link",
};

// -----------------Buttons Size----------------
const buttonSizes = {
  default: "btn-default-size",
  sm: "btn-sm-size",
  lg: "btn-lg-size",
  icon: "btn-icon-size",
};

export const Button = ({
  variant = "default",
  size = "default",
  asChild = false,
  className,
  ...props
}) => {
  //---------------------------- Dynamic tag name------------------------------
  const Component = asChild ? "span" : "button";

  return (
    <Component
      className={`btn ${buttonVariants[variant]} ${buttonSizes[size]} ${className}`}
      {...props}
    />
  );
};
