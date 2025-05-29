import type { PropsWithChildren } from "react";

type Props = {} & PropsWithChildren;

function Main({ children }: Props) {
  return <main className="flex flex-grow flex-col py-8">{children}</main>;
}

export { Main };
