import { type MouseEventHandler, type ReactNode } from "react";
import { cn } from "@carveri/shared/lib/utils.ts";

type Props = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  children: ReactNode;
  active?: boolean;
};

function SubtabButton(props: Readonly<Props>) {
  const { onClick, className, children, active = false } = props;
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors",
        {
          "border-primary bg-primary text-primary-foreground": active,
          "border-border bg-background text-muted-foreground": !active,
        },
        className,
      )}
    >
      {children}
    </button>
  );
}

export default SubtabButton;
