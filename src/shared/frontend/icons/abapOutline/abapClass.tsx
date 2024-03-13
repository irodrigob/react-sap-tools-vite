import * as React from "react";
import { IconProps } from "shared/frontend/icons/types";

/**
 * Sacado de https://tailwindtoolbox.com/icons
 */
export const AbapClass = React.forwardRef<SVGSVGElement, IconProps>(
	({ color = "currentColor", ...props }, forwardedRef) => {
		return (
			<svg
				width="16"
				height="16"
				viewBox="0 0 16 16"
				strokeWidth="2"
				stroke="currentColor"
				fill="none"
				strokeLinecap="round"
				strokeLinejoin="round"
				{...props}
				ref={forwardedRef}
			>
				<defs>
					<linearGradient>
						<stop
							offset="0"
							stopColor="#fff"
							stopOpacity="0"
						></stop>
						<stop
							offset="0.601"
							stopColor="#fff"
							stopOpacity="1"
						></stop>
						<stop
							offset="1"
							stopColor="#fff"
							stopOpacity="0"
						></stop>
					</linearGradient>
					<linearGradient id="linearGradient10798-1-9-3-7-6-8-9-0-9-1">
						<stop
							offset="0"
							stopColor="#4f9e55"
							stopOpacity="1"
						></stop>
						<stop
							offset="0.5"
							stopColor="#418a4d"
							stopOpacity="1"
						></stop>
						<stop
							offset="1"
							stopColor="#91c168"
							stopOpacity="1"
						></stop>
					</linearGradient>
					<linearGradient
						id="linearGradient3929-5"
						x1="388.637"
						x2="388.637"
						y1="478.188"
						y2="462.115"
						gradientUnits="userSpaceOnUse"
						xlinkHref="#linearGradient10798-1-9-3-7-6-8-9-0-9-1"
					></linearGradient>
					<linearGradient
						id="SVGID_1_"
						x1="-389.431"
						x2="-388.565"
						y1="309.826"
						y2="305.564"
						gradientTransform="scale(.85714) rotate(-45 -359.689 412.178)"
						gradientUnits="userSpaceOnUse"
					>
						<stop
							offset="0"
							stopColor="#DCE2F4"
						></stop>
						<stop
							offset="0.5"
							stopColor="#C4CEE4"
						></stop>
						<stop
							offset="1"
							stopColor="#C4CEF4"
						></stop>
					</linearGradient>
				</defs>
				<g
					display="inline"
					transform="translate(0 -1036.362)"
				>
					<g
						display="inline"
						transform="translate(-.55 -.597)"
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
								<circle
									cx="388.125"
									cy="468.237"
									r="8.959"
									fill="url(#linearGradient3929-5)"
									fillOpacity="1"
									stroke="#14733c"
									strokeDasharray="none"
									strokeDashoffset="0"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeMiterlimit="4"
									strokeOpacity="1"
									strokeWidth="1.492"
									display="inline"
									transform="matrix(.66884 0 0 .6714 -267.183 722.47)"
								></circle>
							</g>
						</g>
						<path
							d="M9.958 1043.873c-.068-.42-.226-.738-.471-.95-.24-.213-.555-.32-.943-.32-.515 0-.927.185-1.237.555-.304.365-.456.604-.456 1.465 0 .958.154 1.385.464 1.78.314.396.734.593 1.259.593.393 0 .714-.114.965-.342.25-.233.427-.631.53-1.194l2.032-.017c-.211.963-.616 2.066-1.215 2.557-.599.492-1.401.738-2.408.738-1.144 0-2.057-.373-2.74-1.118-.677-.745-1.015-1.526-1.015-2.844 0-1.333.34-1.995 1.023-2.735.683-.745 1.605-1.117 2.769-1.117.952 0 1.708.213 2.268.638.565.42 1.032 1.408 1.277 2.275z"
							style={{ lineHeight: "125%" }}
							fill="#fff"
							fillOpacity="1"
							stroke="none"
							display="inline"
							fontFamily="Arial"
							fontSize="15.569"
							fontStretch="normal"
							fontStyle="normal"
							fontVariant="normal"
							fontWeight="bold"
							letterSpacing="0"
							wordSpacing="0"
						></path>
					</g>
				</g>
				<g>
					<g transform="translate(378.344 -301.813)">
						<path
							fill="#fff"
							fillOpacity="1"
							stroke="none"
							strokeDasharray="none"
							strokeDashoffset="0"
							strokeLinecap="round"
							strokeLinejoin="miter"
							strokeMiterlimit="4"
							strokeOpacity="1"
							strokeWidth="1"
							d="M2.824 0L0 2.824l.013 1.884 3.001 2.096.869.102L7 4.552v-1.74L4.187 0z"
							opacity="0.894"
							transform="translate(-392 303)"
						></path>
						<g transform="matrix(1.16667 0 0 1.16667 65.783 -51.533)">
							<path
								fill="url(#SVGID_1_)"
								d="M-389.386 310.314c-.085 0-.257-.085-.343-.171L-391.87 308c-.172-.171-.172-.514 0-.686l2.142-2.143c.086-.085.172-.171.343-.171.172 0 .257.086.343.171l2.143 2.143c.171.172.171.515 0 .686l-2.143 2.143c-.086.086-.257.171-.343.171z"
							></path>
							<path
								fill="#4b5966"
								d="M-389.386 305.588l2.143 2.113v.084l-2.143 2.113h-.085l-2.143-2.113v-.084l2.228-2.113m0-.845a.783.783 0 00-.6.253l-2.143 2.113a.91.91 0 000 1.268l2.143 2.112a.933.933 0 00.6.254.933.933 0 00.6-.254l2.143-2.112a.91.91 0 000-1.268l-2.143-2.113a.783.783 0 00-.6-.253z"
							></path>
						</g>
					</g>
				</g>
			</svg>
		);
	}
);

export default AbapClass;
