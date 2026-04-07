import { Eye, EyeClosed } from 'lucide-react';
import React from 'react'
import { useState } from 'react';
import { Children } from 'react'
import { Button } from './Button';

export default function Input({ size, label, type, id, password,text,  children, ...rest }) {
    const [show, setShow] = useState(false);
    function tooglePWD(e) {
      e.preventDefault();
      setShow((prev) => !prev);
    }

  return (

     <div className="w-full">
            <label htmlFor={id} className="font-semibold">
              {label}
            </label>
            <span>{children}</span>
            <div
              className={`${size ? size : "flex items-center gap-3 mt-2 p-2 px-3"} ${type !== "checkbox" && "border border-[#DEDEDE] rounded-md w-full"} `}
            >
              <span className="w-full">
                <input
                  type={password ? (show ? "text" : "password") : type}
                  name={id}
                  id={id}
                  {...rest}
                  className={`outline-none ${text} w-full h-full ${type === "checkbox" && "cursor-pointer"}`}
                />
              </span>
              <span>
                {password && (
                  <Button onClick={tooglePWD} size>
                    {show ? <Eye size={18} /> : <EyeClosed size={18} />}
                  </Button>
                )}
              </span>
            </div>
          </div>
  )
}
