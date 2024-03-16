import * as React from "react";
import { IconProps } from "shared/frontend/icons/types";

/**
 * Sacado de https://tailwindtoolbox.com/icons
 */
export const AbapMethodHandlerPrivate = React.forwardRef<
	SVGSVGElement,
	IconProps
>(({ color = "currentColor", ...props }, forwardedRef) => {
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
					x1="4.5"
					x2="4.5"
					y1="1042.047"
					y2="1046.49"
					gradientTransform="translate(1.517 281.735) scale(.72974)"
					gradientUnits="userSpaceOnUse"
					xlinkHref="#linearGradient4749-5"
				></linearGradient>
				<linearGradient id="linearGradient4749-5">
					<stop
						offset="0"
						stopColor="#ffe"
						stopOpacity="1"
					></stop>
					<stop
						offset="1"
						stopColor="#ffecad"
						stopOpacity="1"
					></stop>
				</linearGradient>
				<linearGradient
					x1="11.063"
					x2="11.063"
					y1="1038.55"
					y2="1049.912"
					gradientTransform="translate(1.517 281.735) scale(.72974)"
					gradientUnits="userSpaceOnUse"
					xlinkHref="#linearGradient4741-1"
				></linearGradient>
				<linearGradient id="linearGradient4741-1">
					<stop
						offset="0"
						stopColor="#ba7f0d"
						stopOpacity="1"
					></stop>
					<stop
						offset="1"
						stopColor="#a2660b"
						stopOpacity="1"
					></stop>
				</linearGradient>
				<linearGradient
					id="linearGradient6732"
					x1="-16.078"
					x2="-16.094"
					y1="1030.294"
					y2="1034.404"
					gradientTransform="matrix(1.20146 0 0 1.20146 26.88 -195.46)"
					gradientUnits="userSpaceOnUse"
					xlinkHref="#linearGradient6726"
				></linearGradient>
				<linearGradient id="linearGradient6726">
					<stop
						offset="0"
						stopColor="#e48289"
						stopOpacity="1"
					></stop>
					<stop
						offset="0.629"
						stopColor="#d95e66"
						stopOpacity="1"
					></stop>
					<stop
						offset="1"
						stopColor="#de6f77"
						stopOpacity="1"
					></stop>
				</linearGradient>
				<filter
					id="filter4223"
					width="1.267"
					height="1.261"
					x="-0.133"
					y="-0.131"
					colorInterpolationFilters="sRGB"
				>
					<feGaussianBlur stdDeviation="0.241"></feGaussianBlur>
				</filter>
			</defs>
			<g
				display="inline"
				transform="translate(0 -1036.362)"
			>
				<image
					width="14"
					height="14"
					x="-14"
					y="1037.362"
					imageRendering="optimizeSpeed"
					preserveAspectRatio="none"
					xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABHNCSVQICAgIfAhkiAAAAOJJREFU KJFj/P//PwM5gIksXQOikQWZc8rDHqeHzXYcZMSpkeHPPwZd/yAMTZ+VlDHEUJ36+x8DAwMDw/9X 7+CY1dGFQa9uDYOEcRyKa1Bs/P/pF8P/J58Y/lx/wMDIwMDwn4GBgc3nF1anozr151+GH7zMDL+E WRgYGCBeYmdlZLhU7s8gFhaM4kdUp375zfBLgIOBwVibgcFYi4GvpIBBPnUCA8MfiCuRncuInHJO Smmj+EOxq4GBgYGBQa9/MwMDAwPDi7OLELb+//8fJxY3iv2PS4yRUFpFD02YrQQ14gIAYfVu2ilx nQsAAAAASUVORK5CYII="
				></image>
				<path
					style={{ lineHeight: "125%" }}
					fill="url(#linearGradient6732)"
					fillOpacity="1"
					stroke="#cb2e39"
					strokeDasharray="none"
					strokeDashoffset="0"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeMiterlimit="4"
					strokeOpacity="1"
					strokeWidth="1"
					d="M4.5 1041.862H10.5V1047.862H4.5z"
					display="inline"
					fontFamily="Sans"
					fontSize="13.589"
					fontStyle="normal"
					fontWeight="normal"
					letterSpacing="0"
					wordSpacing="0"
				></path>
				<path
					fill="#fff"
					fillOpacity="1"
					fillRule="evenodd"
					stroke="none"
					strokeLinecap="butt"
					strokeLinejoin="miter"
					strokeOpacity="1"
					strokeWidth="1"
					d="M8.588 1047.262l2.627.111s-.047-3.603-.063-5.22z"
					display="inline"
					filter="url(#filter4223)"
					opacity="0.618"
					transform="matrix(1.119 0 0 1.23306 -1.541 -243)"
				></path>
			</g>
			<g
				fillOpacity="1"
				strokeDasharray="none"
				strokeLinecap="butt"
				strokeLinejoin="miter"
				strokeMiterlimit="4"
				strokeOpacity="1"
			>
				<circle
					cx="11"
					cy="8"
					r="1"
					fill="#17325d"
					stroke="#000"
					strokeWidth="0"
					display="inline"
				></circle>
				<path
					fill="none"
					stroke="#17325d"
					strokeWidth="1"
					d="M12.644 9.94a1.64 1.54 0 01-.82 1.335 1.64 1.54 0 01-1.64 0 1.64 1.54 0 01-.821-1.334"
					display="inline"
				></path>
				<path
					fill="none"
					stroke="#17325d"
					strokeWidth="1"
					d="M13.5 12.04a2.5 1.456 0 01-1.25 1.261 2.5 1.456 0 01-2.5 0A2.5 1.456 0 018.5 12.04"
					display="inline"
				></path>
			</g>
		</svg>
	);
});

export default AbapMethodHandlerPrivate;
