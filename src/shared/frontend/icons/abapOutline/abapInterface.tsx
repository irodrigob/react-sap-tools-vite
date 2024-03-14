import * as React from "react";
import { IconProps } from "shared/frontend/icons/types";

/**
 * Sacado de https://tailwindtoolbox.com/icons
 */
export const AbapInterface = React.forwardRef<SVGSVGElement, IconProps>(
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
						xlinkHref="#linearGradient10798-1-9-3-7-6-8-9-0-9-1-9"
					></linearGradient>
				</defs>
				<g
					fillOpacity="1"
					fontFamily="Sans"
					fontSize="13.589"
					fontStyle="normal"
					fontWeight="normal"
					letterSpacing="0"
					transform="translate(0 -1036.362)"
					wordSpacing="0"
				>
					<circle
						style={{ lineHeight: "125%" }}
						cx="7.5"
						cy="1043.862"
						r="6"
						fill="url(#linearGradient3016)"
						stroke="#55429f"
						strokeDasharray="none"
						strokeDashoffset="0"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeMiterlimit="4"
						strokeOpacity="1"
						strokeWidth="1"
						display="inline"
					></circle>
					<path
						style={{ lineHeight: "125%" }}
						fill="#fff"
						stroke="none"
						d="M5 1040.362v1h1v5H5v1h5v-1H9v-5h1v-1z"
						display="inline"
					></path>
				</g>
			</svg>
		);
	}
);

export default AbapInterface;
