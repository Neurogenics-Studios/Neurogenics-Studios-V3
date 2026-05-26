"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { SpotlightCard } from "@/components/effects/spotlight-card";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <SpotlightCard
      className={cn(
        "row-span-1 rounded-xl group/bento transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
        className
      )}
      spotlightColor="rgba(139, 92, 246, 0.2)"
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200 relative z-10">
        {icon}
        <div className="font-bold text-foreground mt-2 mb-2">{title}</div>
        <div className="font-normal text-muted-foreground text-xs md:text-sm">{description}</div>
      </div>
    </SpotlightCard>
  );
};
