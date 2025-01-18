import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "font-quicksand font-bold text-[16px] font-bold border-none rounded-[20px] px-[20px] py-[10px]",
        // default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground font-quicksand font-bold",
        link: "text-primary underline-offset-4 hover:underline",
        gradientOrangeBtn:
          "w-[108px] h-[44px] text-white font-quicksand font-bold text-[16px] font-bold border-none rounded-[20px] px-[20px] py-[10px] ",
        
      },
      shadow: {
        shadowBtn: "shadow-shadowBtn",
        shadowNone: "shadow-none",
        shadowComp: "shadow-shadowComp",
      },

      colorBtn: {
        gradientOrangeBtn: "bg-gradient-orange hover:bg-dark-gradient-orange text-white",
        gradientGreenBtn: "bg-gradient-green hover:bg-dark-gradient-green text-white",
        whiteBtn: "bg-gradient-orange bg-clip-text text-transparent "
        // bgDarkGradientOrange: "bg-dar k-gradient-orange",
        // bgDarkGradientGreen: "bg-dark-gradient-green",
      },

      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      // shadow: "shadowBtn",
      colorBtn: "gradientOrangeBtn",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shadow, colorBtn, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, shadow, colorBtn, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button"; 

export { Button, buttonVariants };
