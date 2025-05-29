import type { PropsWithChildren } from "react";

type Props = {} & PropsWithChildren;

function Layout({ children }: Props) {
  return (
    <div className="mx-auto w-[100%] min-h-[100dvh] px-4 md:px-8 py-4 flex flex-col">
      {children}
    </div>
  );
}

export { Layout };
