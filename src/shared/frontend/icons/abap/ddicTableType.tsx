import * as React from "react";
import { IconProps } from "shared/frontend/icons/types";

/**
 * Sacado de https://tailwindtoolbox.com/icons
 */
export const DdicTableType = React.forwardRef<SVGSVGElement, IconProps>(
	({ color = "currentColor", ...props }, forwardedRef) => {
		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="13"
				height="13"
			>
				<path
					fill="#6BA4C5"
					d="M0 0h13v5H9v4H5v4H0V0z"
				></path>
				<path
					fill="#3D80A6"
					d="M0 5l1 3h3l1-3v3h3l1-3v4H5v4H0V5z"
				></path>
			</svg>
		);
	}
);

export default DdicTableType;
