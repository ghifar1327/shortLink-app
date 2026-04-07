import React from 'react'

export function Button({
  blue = false,
  src,
  alt,
  children,
  size,
  border,
  iconSize,
  radius,
  type,
  ...rest

}) { 
    return (
    <button
      type={type}
      {...rest}
      className={`${blue && "bg-primary border border-primary text-white hover:bg-blue-900"} ${size ? size : "w-full p-2 gap-5"} ${border && border} ${radius ? radius : "rounded-md" } flex items-center justify-center gap-3 cursor-pointer`}
    >
      {src && <img src={src} alt={alt} className={iconSize} />}
      <p className="flex items-center justify-center gap-5">{children}</p>
    </button>
  );
}