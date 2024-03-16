import * as React from "react";
import { IconProps } from "shared/frontend/icons/types";

/**
 * Sacado de https://tailwindtoolbox.com/icons
 */
export const AbapDecoratorRedefinition = React.forwardRef<
	SVGSVGElement,
	IconProps
>(({ color = "currentColor", ...props }, forwardedRef) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			width="8"
			height="8"
			version="1.1"
		>
			<defs>
				<linearGradient id="linearGradient4182">
					<stop
						offset="0"
						stopColor="#50b053"
						stopOpacity="1"
					></stop>
					<stop
						offset="0.5"
						stopColor="#75c060"
						stopOpacity="1"
					></stop>
					<stop
						offset="1"
						stopColor="#9ad16d"
						stopOpacity="1"
					></stop>
				</linearGradient>
				<linearGradient>
					<stop
						offset="0"
						stopColor="#5481b6"
						stopOpacity="1"
					></stop>
					<stop
						offset="0.5"
						stopColor="#1c65a2"
						stopOpacity="1"
					></stop>
					<stop
						offset="1"
						stopColor="#5286ba"
						stopOpacity="1"
					></stop>
				</linearGradient>
				<linearGradient
					id="linearGradient6744-2-1-0"
					x1="-31.957"
					x2="-31.957"
					y1="1042.254"
					y2="1039.602"
					gradientTransform="matrix(1.34715 0 0 .92374 31.154 78.51)"
					gradientUnits="userSpaceOnUse"
					xlinkHref="#linearGradient4182"
				></linearGradient>
			</defs>
			<g
				display="inline"
				transform="translate(0 -1044.362)"
			>
				<g
					display="inline"
					transform="matrix(-1 0 0 1 16.13 8.014)"
				>
					<g
						style={{ lineHeight: "125%" }}
						fill="#fff"
						fillOpacity="1"
						stroke="none"
						strokeDasharray="none"
						strokeLinecap="butt"
						strokeMiterlimit="4"
						strokeOpacity="1"
						display="inline"
						fontFamily="Sans"
						fontSize="13.589"
						fontStyle="normal"
						fontWeight="normal"
						letterSpacing="0"
						transform="scale(-1 1)"
						wordSpacing="0"
					>
						<path
							fill="#fff"
							stroke="none"
							strokeLinejoin="miter"
							strokeWidth="1"
							d="M-16.13 1041.506H-8.129999999999999V1043.3480000000002H-16.13z"
							opacity="1"
						></path>
						<path
							fill="#fff"
							stroke="#fff"
							strokeLinejoin="miter"
							strokeWidth="1.113"
							d="M-240.583 880.705H-234.84V881.166H-240.583z"
							display="inline"
							fontFamily="Sans"
							fontSize="13.589"
							fontStyle="normal"
							fontWeight="normal"
							letterSpacing="0"
							transform="matrix(.69485 -.71915 .17139 .9852 0 0)"
							style={{ lineHeight: "125%" }}
							opacity="1"
							wordSpacing="0"
						></path>
						<path
							fill="#fff"
							stroke="#fff"
							strokeLinejoin="miter"
							strokeWidth="1.114"
							d="M1279.228 870.909H1286.223V871.458H1279.228z"
							display="inline"
							fontFamily="Sans"
							fontSize="13.589"
							fontStyle="normal"
							fontWeight="normal"
							letterSpacing="0"
							transform="matrix(.66816 .74402 -.99529 .09699 0 0)"
							style={{ lineHeight: "125%" }}
							opacity="1"
							wordSpacing="0"
						></path>
						<path
							d="M-8.63 1041.848h-7l3.5-4z"
							style={{ lineHeight: "125%" }}
							fill="url(#linearGradient6744-2-1-0)"
							stroke="#008233"
							strokeLinejoin="round"
							strokeWidth="1"
							display="inline"
							fontFamily="Sans"
							fontSize="13.589"
							fontStyle="normal"
							fontWeight="normal"
							letterSpacing="0"
							wordSpacing="0"
						></path>
					</g>
				</g>
			</g>
		</svg>
	);
});

export default AbapDecoratorRedefinition;
