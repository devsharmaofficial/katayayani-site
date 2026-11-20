import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface WebsiteBackgroundProps {
  children: ReactNode;
}

export const WebsiteBackground = ({ children }: WebsiteBackgroundProps) => {
  return (
    <div className="min-h-screen w-full max-w-full overflow-x-clip relative bg-white flex flex-col">
      {/* Content wrapper with higher z-index to stay above the background */}
      <div className="relative z-10 flex flex-col flex-grow w-full max-w-full overflow-x-clip bg-white">
        {children}
      </div>
    </div>
  );
};
