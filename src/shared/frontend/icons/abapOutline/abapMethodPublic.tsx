import * as React from "react";
import { IconProps } from "shared/frontend/icons/types";

/**
 * Sacado de https://tailwindtoolbox.com/icons
 */
export const AbapMethodPublic = React.forwardRef<SVGSVGElement, IconProps>(
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
					<linearGradient id="linearGradient10798-1-9-3-7-6-8-9-0-9-1">
						<stop
							offset="0"
							stopColor="#75ba7a"
							stopOpacity="1"
						></stop>
						<stop
							offset="0.5"
							stopColor="#418a4d"
							stopOpacity="1"
						></stop>
						<stop
							offset="1"
							stopColor="#a4c589"
							stopOpacity="1"
						></stop>
					</linearGradient>
					<linearGradient
						id="linearGradient9837"
						x1="388.637"
						x2="388.637"
						y1="478.188"
						y2="462.115"
						gradientUnits="userSpaceOnUse"
						xlinkHref="#linearGradient10798-1-9-3-7-6-8-9-0-9-1"
					></linearGradient>
				</defs>
				<g
					display="inline"
					transform="translate(0 -1036.362)"
				>
					<g
						display="inline"
						transform="matrix(-1 0 0 1 16.13 8.014)"
					>
						<g
							transform="scale(-1 1)"
							style={{ lineHeight: "125%" }}
							fill="#fff"
							fillOpacity="1"
							stroke="none"
							display="inline"
							fontFamily="Sans"
							fontSize="13.589"
							fontStyle="normal"
							fontWeight="normal"
							letterSpacing="0"
							wordSpacing="0"
						>
							<path
								fill="url(#linearGradient9837)"
								fillOpacity="1"
								stroke="#058149"
								strokeDasharray="none"
								strokeDashoffset="0"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeMiterlimit="4"
								strokeOpacity="1"
								strokeWidth="3.18"
								d="M398.75 468.237c0 5.868-4.757 10.625-10.625 10.625s-10.625-4.757-10.625-10.625 4.757-10.625 10.625-10.625 10.625 4.757 10.625 10.625z"
								display="inline"
								transform="matrix(.32985 0 0 .32985 -136.127 882.928)"
							></path>
						</g>
					</g>
				</g>
			</svg>
		);
	}
);

export default AbapMethodPublic;
