import * as React from "react";
import { IconProps } from "shared/frontend/icons/types";

/**
 * Sacado de https://tailwindtoolbox.com/icons
 */
export const AbapMethodPrivate = React.forwardRef<SVGSVGElement, IconProps>(
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
					<linearGradient id="linearGradient5789">
						<stop
							offset="0"
							stopColor="#f57c7c"
							stopOpacity="1"
						></stop>
						<stop
							offset="0.629"
							stopColor="#f14d5c"
							stopOpacity="1"
						></stop>
						<stop
							offset="1"
							stopColor="#e76061"
							stopOpacity="1"
						></stop>
					</linearGradient>
					<linearGradient
						id="linearGradient5742"
						x1="-16.115"
						x2="-16.115"
						y1="1031.035"
						y2="1033.667"
						gradientTransform="matrix(1.19343 0 0 1.19343 11.623 -194.188)"
						gradientUnits="userSpaceOnUse"
						xlinkHref="#linearGradient5789"
					></linearGradient>
					<filter
						id="filter5785"
						width="1.24"
						height="1.24"
						x="-0.12"
						y="-0.12"
					>
						<feGaussianBlur stdDeviation="0.2"></feGaussianBlur>
					</filter>
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
							strokeDasharray="none"
							strokeDashoffset="0"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeMiterlimit="4"
							strokeOpacity="1"
							display="inline"
							fontFamily="Sans"
							fontSize="13.589"
							fontStyle="normal"
							fontWeight="normal"
							letterSpacing="0"
							wordSpacing="0"
						>
							<path
								fill="url(#linearGradient5742)"
								fillOpacity="1"
								stroke="#cb2e39"
								strokeWidth="1.018"
								d="M-10.606 1034.866H-4.646V1040.826H-10.606z"
							></path>
							<path
								style={{ lineHeight: "125%" }}
								fill="none"
								stroke="#fff"
								strokeWidth="0.683"
								d="M-9.625 1035.847H-5.628V1039.844H-9.625z"
								display="inline"
								filter="url(#filter5785)"
								fontFamily="Sans"
								fontSize="13.589"
								fontStyle="normal"
								fontWeight="normal"
								letterSpacing="0"
								opacity="0.25"
								wordSpacing="0"
							></path>
						</g>
					</g>
				</g>
			</svg>
		);
	}
);

export default AbapMethodPrivate;
