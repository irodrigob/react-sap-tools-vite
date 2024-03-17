import * as React from "react";
import { IconProps } from "shared/frontend/icons/types";

/**
 * Sacado de https://tailwindtoolbox.com/icons
 */
export const AbapGeneric = React.forwardRef<SVGSVGElement, IconProps>(
	({ color = "currentColor", ...props }, forwardedRef) => {
		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="15"
				height="13"
			>
				<path
					fill="#D0D8E2"
					d="M0 0h15v13H0V0z"
				></path>
				<path
					fill="#0684C7"
					d="M2 2h11L8.41 7.273C6.93 8.956 6.93 8.956 6 11H2V2z"
				></path>
			</svg>
		);
	}
);

export default AbapGeneric;
