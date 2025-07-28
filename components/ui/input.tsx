import * as React from "react";

import { cn } from "@/lib/utils";
import { TbEye, TbEyeClosed } from "react-icons/tb";
import { Button } from "./button";
import { Label } from "./label";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  allowMultiple?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      leftIcon,
      rightIcon,
      type,
      allowMultiple,
      value,
      defaultValue,
      label,
      ...props
    },
    ref
  ) => {
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);
    return (
      <div className="relative">
        {label && (
          <Label className="peer-disabled:text-muted-foreground text-sm font-medium text-text-primary">
            {label}
          </Label>
        )}
        <input
          type={type === "password" ? (show ? "text" : "password") : type}
          placeholder=" "
          className={cn(
            "flex relative peer h-12 w-full rounded-xl bg-transparent border border-borderColor px-3 text-sm placeholder:text-muted-foreground focus:outline-[#00328B] disabled:cursor-not-allowed disabled:opacity-50",
            leftIcon && "pl-8",
            rightIcon && "pr-12",
            className
          )}
          ref={ref}
          {...props}
        />
        {(type === "password" || rightIcon) && (
          <span className="absolute inset-y-0 right-0 top-5 flex items-center">
            {type === "password" && !rightIcon && (
              <Button
                aria-label="toggle show password"
                onClick={handleClick}
                size="sm"
                type="button"
                variant="unstyled"
                className="text-primary text-xl"
              >
                {show ? (
                  <TbEye className="h-12 w-12" />
                ) : (
                  <TbEyeClosed className="h-12 w-12" />
                )}
              </Button>
            )}
            {rightIcon}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
