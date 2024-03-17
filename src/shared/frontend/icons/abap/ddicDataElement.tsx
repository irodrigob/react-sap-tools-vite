import * as React from "react";
import { IconProps } from "shared/frontend/icons/types";

/**
 * Sacado de https://tailwindtoolbox.com/icons
 */
export const DdicDataElement = React.forwardRef<SVGSVGElement, IconProps>(
	({ color = "currentColor", ...props }, forwardedRef) => {
		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="13"
				height="13"
			>
				<path
					fill="#70A8DB"
					d="M0 0h13v13H0V0z"
				></path>
				<path
					fill="#EBF3FA"
					d="M2 2h9v9H2V2z"
				></path>
				<path
					fill="#4A93D3"
					d="M12 6h1v7H0l1-2h10l1-5z"
				></path>
				<path
					fill="#FDFDFE"
					d="M2 2h9l-1 3-6-1-1 5H2V2z"
				></path>
				<path
					fill="#A4D3E9"
					d="M4 4h5v5H4V4z"
				></path>
			</svg>
		);
	}
);

export default DdicDataElement;
