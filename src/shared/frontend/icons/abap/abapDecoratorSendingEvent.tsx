import * as React from "react";
import { IconProps } from "shared/frontend/icons/types";

/**
 * Sacado de https://tailwindtoolbox.com/icons
 */
export const AbapDecoratorSendingEvent = React.forwardRef<
	SVGSVGElement,
	IconProps
>(({ color = "currentColor", ...props }, forwardedRef) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			width="12"
			height="14"
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
				<linearGradient>
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
			</defs>
			<g
				fillOpacity="1"
				strokeDasharray="none"
				strokeLinecap="butt"
				strokeLinejoin="miter"
				strokeMiterlimit="4"
				strokeOpacity="1"
			>
				<ellipse
					cx="6"
					cy="-11.649"
					fill="#17325d"
					stroke="#000"
					strokeWidth="0"
					display="inline"
					rx="2.014"
					ry="1.852"
					transform="scale(1 -1)"
				></ellipse>
				<path
					fill="none"
					stroke="#17325d"
					strokeWidth="1.931"
					d="M9.31 8.055a3.304 2.852 0 00-1.651-2.47 3.304 2.852 0 00-3.304 0 3.304 2.852 0 00-1.652 2.47"
					display="inline"
				></path>
				<path
					fill="none"
					stroke="#17325d"
					strokeWidth="1.931"
					d="M11.035 4.169a5.035 2.697 0 00-2.518-2.336 5.035 2.697 0 00-5.034 0A5.035 2.697 0 00.965 4.17"
					display="inline"
				></path>
			</g>
		</svg>
	);
});

export default AbapDecoratorSendingEvent;
