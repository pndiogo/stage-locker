import type { PropsWithChildren } from "react";

type Props = {} & PropsWithChildren;

function Layout({ children }: Props) {
  return (
    <div className="mx-auto w-[100%] min-h-[100dvh] max-w-6xl px-4 py-8 flex flex-col">
      {children}
    </div>
  );
}

export { Layout };
