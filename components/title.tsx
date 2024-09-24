import { Text } from "react-native";
import React, { ReactNode } from "react";
import { cn } from "@/libs/cn";

/**
 * export const languages = ['en', 'am', 'ke', 'ug', 'gm', 'ng'] as const;
export type LocalesType = (typeof languages)[number];

 */

const ORDERS = [
  [1, 32],
  [2, 24],
];
const defaultOrder = ORDERS[0][0];
type OrderType = (typeof ORDERS)[number][0];

type TitleProps = {
  children?: ReactNode;
  order?: OrderType;
  className?: string;
};

const Title = ({ children, order = defaultOrder, className }: TitleProps) => {
  const textSizeBasedOnOrder = `text-[${ORDERS[order][1]}px]`;

  console.log({
    textSizeBasedOnOrder
  })

  return (
    <Text
      className={cn(
        "font-semibold text-primary",
        textSizeBasedOnOrder,
        className
      )}
    >
      {children}
    </Text>
  );
};

export default Title;
