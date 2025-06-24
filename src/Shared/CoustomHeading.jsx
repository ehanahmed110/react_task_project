import React from "react";

export function CoustomHeading({ title, icon: Icon, className = "" }) {
  return (
    <>
      <div className={`flex items-center gap-2 mb-4 ${className}`}>
        {Icon && <Icon className="text-primary text-lg" />}
        <h1 className="text-xl font-bold text-gray-800">{title}</h1>
      </div>
    </>
  );
}
