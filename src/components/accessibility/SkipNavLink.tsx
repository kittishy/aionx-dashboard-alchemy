
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface SkipNavLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  contentId?: string;
  label?: string;
}

export interface SkipNavContentProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
}

export const defaultContentId = "skip-nav-content";

export const SkipNavLink = forwardRef<HTMLAnchorElement, SkipNavLinkProps>(
  (
    {
      contentId = defaultContentId,
      label = "Pular para o conteúdo",
      className,
      ...props
    },
    forwardedRef
  ) => {
    return (
      <a
        {...props}
        ref={forwardedRef}
        href={`#${contentId}`}
        className={cn(
          "skip-to-content focus:fixed focus:top-0 focus:left-0 focus:w-auto focus:h-auto",
          className
        )}
      >
        {label}
      </a>
    );
  }
);

SkipNavLink.displayName = "SkipNavLink";

export const SkipNavContent = forwardRef<HTMLDivElement, SkipNavContentProps>(
  ({ id = defaultContentId, ...props }, forwardedRef) => {
    return <div {...props} ref={forwardedRef} id={id} />;
  }
);

SkipNavContent.displayName = "SkipNavContent";
