import * as React from "react";
import { IconProps } from "shared/frontend/icons/types";

/**
 * Sacado de https://tailwindtoolbox.com/icons
 */
export const DdicDomain = React.forwardRef<SVGSVGElement, IconProps>(
	({ color = "currentColor", ...props }, forwardedRef) => {
		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="13"
				height="13"
			>
				<path
					fill="#6DA1D0"
					d="M7.625.125C11 1 11 1 13 3c.266 1.875.266 1.875.25 4l.016 2.125C13 11 13 11 11 13c-7.01.556-7.01.556-10-1.125C-.504 9.055-.45 7.144 0 4 2.322.378 3.28-.025 7.625.125z"
				></path>
				<path
					fill="#E9F2F9"
					d="M6.5 1.75C9 2 9 2 11 4c.25 2.5.25 2.5 0 5-2 2-2 2-4.5 2.25C4 11 4 11 2 9c-.25-2.5-.25-2.5 0-5 2-2 2-2 4.5-2.25z"
				></path>
				<path
					fill="#4377A5"
					d="M12 9v3c-1.891 1.891-4.57 1.237-7.09 1.328L3 13l-2-3 5.957.098C9.203 10.083 9.203 10.083 12 9z"
				></path>
				<path
					fill="#ACD6EB"
					d="M5 4l4 1-1 4-4-1 1-4z"
				></path>
				<path
					fill="#5891C4"
					d="M10 1l3 2c.188 3.125.188 3.125 0 6h-3V1z"
				></path>
				<path
					fill="#D5E6F4"
					d="M10 4h1c.125 2.375.125 2.375 0 5-2 2-2 2-4.625 2.125L4 11l2.438-2.375C8.986 6.28 8.986 6.28 10 4z"
				></path>
			</svg>
		);
	}
);

export default DdicDomain;
