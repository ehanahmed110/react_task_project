import React from "react";

export function CoustomHeading({ title, icon: Icon,count,subtitle, className = "" }) {
  return (
    <>
      <div className={`flex items-center gap-2 mb-4 ${className}`}>
        {Icon && <Icon className="text-primary text-lg" />}
        <h1 className="text-xl font-medium capitalize">{title}
          {count !== undefined &&(
            <>({count}<span className="text-[13px] italic">{subtitle}</span>)</>
          )}
        </h1>
      </div>
    </>
  );
}
