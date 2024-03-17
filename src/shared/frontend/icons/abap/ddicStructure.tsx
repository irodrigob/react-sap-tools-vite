import * as React from "react";
import { IconProps } from "shared/frontend/icons/types";

/**
 * Sacado de https://tailwindtoolbox.com/icons
 */
export const DdicStructure = React.forwardRef<SVGSVGElement, IconProps>(
	({ color = "currentColor", ...props }, forwardedRef) => {
		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="13"
				height="6"
			>
				<path
					fill="#5594B9"
					d="M0 0h13v6H0V0z"
				></path>
			</svg>
		);
	}
);

export default DdicStructure;
