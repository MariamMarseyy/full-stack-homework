import React from "react";

export const unsetSymbolHandler = (
  event: React.KeyboardEvent,
  isMinus?: boolean
): void => {
  const forbiddenKeys: string[] = ["e", "E", "+", ",", ".", isMinus ? "-" : ""];

  if (forbiddenKeys.includes(event.key)) {
    event.preventDefault();
  }
};
