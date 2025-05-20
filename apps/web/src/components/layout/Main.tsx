import type { PropsWithChildren } from "react";

type Props = {} & PropsWithChildren;

function Main({ children }: Props) {
  return <main>{children}</main>;
}

export { Main };
