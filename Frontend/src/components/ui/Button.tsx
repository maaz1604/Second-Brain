import type { ReactElement } from "react";

type Variants = "primary" | "secondary";

export interface ButtonProps {
    variant:Variants;
    size:"md" | "sm" | "lg";
    text:string;
    startIcon?:ReactElement;
    endIcon?:ReactElement;
    onClick:() => void;
}

//TODO: Use maps/Records to map type Variants
const variantStyles = {
    "primary":"bg-purple-600 text-white",
    "secondary":"bg-purple-300 text-purple-600"
};

const sizeStyles = {
    "sm":"p-2",
    "md":"p-4",
    "lg":"p-6"
}

const defaultStyles = "rounded-md";

export const Button = (props:ButtonProps) => {
   return <button className={`${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]}`}> {props.text} </button>
}