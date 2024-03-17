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
					<linearGradient id="linearGradient9800">
						<stop
							offset="0"
							stopColor="#be9c28"
							stopOpacity="1"
						></stop>
						<stop
							offset="1"
							stopColor="#a77e1c"
							stopOpacity="1"
						></stop>
					</linearGradient>
					<filter
						id="filter5785-5"
						width="1.24"
						height="1.24"
						x="-0.12"
						y="-0.12"
					>
						<feGaussianBlur stdDeviation="0.2"></feGaussianBlur>
					</filter>
					<linearGradient
						id="linearGradient5742-5"
						x1="-17.448"
						x2="-14.571"
						y1="1030.813"
						y2="1033.69"
						gradientTransform="matrix(1.19343 0 0 1.19343 11.623 -194.188)"
						gradientUnits="userSpaceOnUse"
						xlinkHref="#linearGradient5789-2"
					></linearGradient>
					<linearGradient id="linearGradient5789-2">
						<stop
							offset="0"
							stopColor="#fff2b0"
							stopOpacity="1"
						></stop>
						<stop
							offset="0.629"
							stopColor="#fecf6c"
							stopOpacity="1"
						></stop>
						<stop
							offset="1"
							stopColor="#fede96"
							stopOpacity="1"
						></stop>
					</linearGradient>
					<linearGradient
						id="linearGradient9806"
						x1="-10.453"
						x2="-4.312"
						y1="1034.62"
						y2="1040.76"
						gradientUnits="userSpaceOnUse"
						xlinkHref="#linearGradient9800"
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
							<g
								display="inline"
								transform="rotate(45 10.461 1021.527)"
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
										transform="scale(-1 1)"
										wordSpacing="0"
									>
										<rect
											width="5.96"
											height="5.96"
											x="-10.606"
											y="1034.866"
											fill="url(#linearGradient5742-5)"
											fillOpacity="1"
											stroke="url(#linearGradient9806)"
											strokeWidth="1.018"
											rx="0.688"
											ry="0.688"
										></rect>
										<path
											style={{ lineHeight: "125%" }}
											fill="none"
											stroke="#fff"
											strokeWidth="0.683"
											d="M-9.625 1035.847H-5.628V1039.844H-9.625z"
											display="inline"
											filter="url(#filter5785-5)"
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
						</g>
					</g>
				</g>
			</svg>
		);
	}
);

export default AbapMethodPrivate;
