import * as React from "react";
import { IconProps } from "shared/frontend/icons/types";

/**
 * Sacado de https://tailwindtoolbox.com/icons
 */
export const DdicTable = React.forwardRef<SVGSVGElement, IconProps>(
	({ color = "currentColor", ...props }, forwardedRef) => {
		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="13"
				height="12"
			>
				<path
					fill="#D4DAE3"
					d="M0 0h13v12H0V0z"
				></path>
				<path
					fill="#7E9CCB"
					d="M0 0h13v4H0V0z"
				></path>
			</svg>
		);
	}
);

export default DdicTable;
