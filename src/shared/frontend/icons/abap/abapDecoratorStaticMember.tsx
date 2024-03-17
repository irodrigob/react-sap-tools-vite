import * as React from "react";
import { IconProps } from "shared/frontend/icons/types";

/**
 * Sacado de https://tailwindtoolbox.com/icons
 */
export const AbapDecoratorStaticMember = React.forwardRef<
	SVGSVGElement,
	IconProps
>(({ color = "currentColor", ...props }, forwardedRef) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="7"
			height="7"
			version="1.1"
		>
			<g
				strokeOpacity="1"
				transform="translate(0 -1045.362)"
			>
				<path
					fill="#fff"
					fillOpacity="1"
					stroke="none"
					d="M1.002 1045.354H7.008V1052.362H1.002z"
					opacity="1"
				></path>
				<path
					fill="none"
					fillRule="evenodd"
					stroke="#c7022d"
					strokeDasharray="none"
					strokeLinecap="butt"
					strokeLinejoin="miter"
					strokeMiterlimit="4"
					strokeWidth="0.9"
					d="M2.458 1050.364v.566c0 .706.514.955 1.002.955h.974c.499 0 1.04-.543 1.04-1.04v-1.01c0-.435-.442-.944-.943-.944h-1.06c-.479 0-1.016-.55-1.016-1.015v-1.05c0-.437.531-1.004 1.005-1.004h1.004c.746 0 1.027.897 1.027 1.072v.48"
				></path>
			</g>
		</svg>
	);
});

export default AbapDecoratorStaticMember;
