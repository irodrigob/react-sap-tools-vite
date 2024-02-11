import * as React from "react";
import { IconProps } from "./types";

/**
 * Sacado de https://tailwindtoolbox.com/icons
 */
export const FileCode = React.forwardRef<SVGSVGElement, IconProps>(
	({ color = "currentColor", ...props }, forwardedRef) => {
		return (
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				strokeWidth="2"
				stroke="currentColor"
				fill="none"
				strokeLinecap="round"
				strokeLinejoin="round"
				{...props}
				ref={forwardedRef}
			>
				<path d="M10 3v4c0 .6-.4 1-1 1H5m5 4-2 2 2 2m4-4 2 2-2 2m5-12v16c0 .6-.4 1-1 1H6a1 1 0 0 1-1-1V8c0-.4.1-.6.3-.8l4-4 .6-.2H18c.6 0 1 .4 1 1Z" />
			</svg>
		);
	}
);

export default FileCode;
