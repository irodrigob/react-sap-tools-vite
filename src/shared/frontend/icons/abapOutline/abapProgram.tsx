import * as React from "react";
import { IconProps } from "shared/frontend/icons/types";

/**
 * Sacado de https://tailwindtoolbox.com/icons
 */
export const AbapProgram = React.forwardRef<SVGSVGElement, IconProps>(
	({ color = "currentColor", ...props }, forwardedRef) => {
		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlnsXlink="http://www.w3.org/1999/xlink"
				width="16"
				height="16"
				version="1.1"
			>
				<defs>
					<linearGradient id="linearGradient7019">
						<stop
							offset="0"
							stopColor="#a47d28"
							stopOpacity="1"
						></stop>
						<stop
							offset="0.5"
							stopColor="#8b6a22"
							stopOpacity="1"
						></stop>
						<stop
							offset="1"
							stopColor="#bc8f2e"
							stopOpacity="1"
						></stop>
					</linearGradient>
					<linearGradient
						x1="388.637"
						x2="388.637"
						y1="478.188"
						y2="462.115"
						gradientUnits="userSpaceOnUse"
						xlinkHref="#linearGradient10798-1-9-3-7-6-8-9-0-9-1"
					></linearGradient>
					<linearGradient id="linearGradient10798-1-9-3-7-6-8-9-0-9-1">
						<stop
							offset="0"
							stopColor="#7564b1"
							stopOpacity="1"
						></stop>
						<stop
							offset="0.5"
							stopColor="#5d4aa1"
							stopOpacity="1"
						></stop>
						<stop
							offset="1"
							stopColor="#9283c3"
							stopOpacity="1"
						></stop>
					</linearGradient>
					<linearGradient
						x1="388.637"
						x2="388.637"
						y1="478.188"
						y2="462.115"
						gradientUnits="userSpaceOnUse"
						xlinkHref="#linearGradient10798-1-9-3-7-6-8-9-0-9-1"
					></linearGradient>
					<linearGradient
						x1="388.637"
						x2="388.637"
						y1="478.188"
						y2="462.115"
						gradientUnits="userSpaceOnUse"
						xlinkHref="#linearGradient10798-1-9-3-7-6-8-9-0-9-1-9"
					></linearGradient>
					<linearGradient id="linearGradient10798-1-9-3-7-6-8-9-0-9-1-9">
						<stop
							offset="0"
							stopColor="#7564b1"
							stopOpacity="1"
						></stop>
						<stop
							offset="0.5"
							stopColor="#5d4aa1"
							stopOpacity="1"
						></stop>
						<stop
							offset="1"
							stopColor="#9283c3"
							stopOpacity="1"
						></stop>
					</linearGradient>
					<linearGradient
						id="linearGradient3016"
						x1="388.637"
						x2="388.637"
						y1="478.188"
						y2="462.115"
						gradientTransform="matrix(.5647 0 0 .5647 -211.676 779.446)"
						gradientUnits="userSpaceOnUse"
						xlinkHref="#linearGradient7019"
					></linearGradient>
				</defs>
				<g transform="translate(0 -1036.362)">
					<circle
						style={{ lineHeight: "125%" }}
						cx="7.5"
						cy="1043.862"
						r="6"
						fill="url(#linearGradient3016)"
						fillOpacity="1"
						stroke="#73571c"
						strokeDasharray="none"
						strokeDashoffset="0"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeMiterlimit="4"
						strokeOpacity="1"
						strokeWidth="1"
						display="inline"
						fontFamily="Sans"
						fontSize="13.589"
						fontStyle="normal"
						fontWeight="normal"
						letterSpacing="0"
						wordSpacing="0"
					></circle>
					<path
						fill="#fff"
						d="M8 1039.902c1.2 0 3 1.013 3 3.013s-1.716 2.987-3 3l-1-.013v2H5v-8zm-1 4h.758c.738 0 1.242-.301 1.242-1 0-.705-.445-1-1.25-1H7z"
					></path>
				</g>
			</svg>
		);
	}
);

export default AbapProgram;
