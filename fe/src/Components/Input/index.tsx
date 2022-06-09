import {
  forwardRef,
  ForwardRefExoticComponent,
  InputHTMLAttributes
} from "react";
import { classNames } from "../../Utils/classNames";
import { EyeIcon } from "../Icons";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  classContainer?: string;
  type?: string;
  info?: string;
  infoType?: "info" | "danger" | "primary" | "success";
  error?: string;
  filename?:string;
  checked?:boolean
}
const Input: ForwardRefExoticComponent<Props> = forwardRef<
  HTMLInputElement,
  Props
>(
  (
    {
      label,
      type = "text",
      info,
      infoType = "info",
      error,
      classContainer = "",
      filename='',
      checked,
      ...rest
    },
    ref
  ) => {
    const { name } = rest;
    function togglePassword(e: any) {
      e.preventDefault();
      const target = e.currentTarget;
      if (target) {
        const input = target.previousSibling;
        if (input.type === "password") {
          input.type = "text";
        } else {
          input.type = "password";
        }
      }
    }

    return (
      <div className={classNames("space-y-2", classContainer)}>
        <label className="inline-block" htmlFor={name}>
          {label}
        </label>
        <div className="flex flex-row w-full relative">
          <input
            id={name}
            name={name}
            ref={ref}
            className={classNames(
              "grow border border-gray-300 p-2 outline-none w-full",
              type === "password" ? "rounded-l-md" : "rounded-md",
              type === "file" ? "hidden" : ""
            )}
            type={type}
            {...rest}
          />
          {type === "file" && (
            <div className="grow rounded-l-md border border-gray-300 p-2 outline-none w-full truncate">
              <p className='truncate'>{filename ? filename : 'Pilih file..'}</p>
            </div>
          )}
          {type === "password" && (
            <button
              type="button"
              className="flex-none p-2 px-3 border border-gray-300 border-l-transparent bg-gray-200 hover:bg-gray-300 rounded-r-md"
              onClick={togglePassword}
            >
              {EyeIcon}
            </button>
          )}
          {type == "file" && (
            <label
              className="cursor-pointer select-none flex items-center p-2 px-3 border border-gray-300 border-l-transparent bg-gray-200 hover:bg-gray-300 rounded-r-md"
              htmlFor={name}
            >
              browse
            </label>
          )}
          {checked && (
            <span className='h-6 w-6 text-green-400 absolute right-4 top-1/2 -translate-y-1/2 '>{CheckIcon}</span>
          )}
        </div>
        {!error && info && (
          <p
            className={classNames(
              "text-xs inline-block",
              infoType === "danger" ? "text-primary" : "",
              infoType === "success" ? "text-green-500" : "",
              infoType === "primary" ? "text-blue-600" : ""
            )}
          >
            {info}
          </p>
        )}
        {error && (
          <span className="text-sm inline-block text-primary">{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
