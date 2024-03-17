import * as React from "react";
import { IconProps } from "shared/frontend/icons/types";

/**
 * Sacado de https://tailwindtoolbox.com/icons
 */
export const AbapDecoratorFinalMember = React.forwardRef<
	SVGSVGElement,
	IconProps
>(({ color = "currentColor", ...props }, forwardedRef) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			width="7"
			height="7"
			version="1.1"
		>
			<defs>
				<linearGradient id="linearGradient3768">
					<stop
						offset="0"
						stopColor="#147a38"
						stopOpacity="1"
					></stop>
					<stop
						offset="1"
						stopColor="#308a50"
						stopOpacity="1"
					></stop>
				</linearGradient>
				<linearGradient
					x1="6"
					x2="6"
					y1="1051.362"
					y2="1044.362"
					gradientTransform="translate(-2)"
					gradientUnits="userSpaceOnUse"
					xlinkHref="#linearGradient3768"
				></linearGradient>
				<filter
					id="filter3774"
					width="1.33"
					height="1.189"
					x="-0.165"
					y="-0.094"
				>
					<feGaussianBlur stdDeviation="0.275"></feGaussianBlur>
				</filter>
			</defs>
			<g
				fillOpacity="1"
				transform="translate(0 -1045.362)"
			>
				<path
					fill="#fff"
					stroke="none"
					d="M1 1045.362H4V1052.362H1z"
				></path>
				<path
					fill="#fff"
					stroke="#fff"
					strokeDasharray="none"
					strokeMiterlimit="4"
					strokeWidth="0.5"
					d="M2 1045.362v7h1v-3h2v-1H3v-2h3v-1H2z"
					filter="url(#filter3774)"
					opacity="0.75"
				></path>
				<path
					fill="#fff"
					stroke="none"
					d="M3.002 1045.368H6.002V1048.395H3.002z"
				></path>
				<path
					fill="#fff"
					stroke="none"
					d="M2.98 1049.363H4.016V1052.39H2.98z"
				></path>
				<path
					fill="#fff"
					stroke="none"
					d="M1.98 1049.363H5.002V1050.3590000000002H1.98z"
				></path>
				<path
					fill="#fff"
					stroke="none"
					d="M3.984 1045.35H7.006V1047.3719999999998H3.984z"
				></path>
				<path
					fill="#fff"
					stroke="none"
					d="M3.98 1046.363H7.002V1047.3590000000002H3.98z"
				></path>
				<path
					fill="#fff"
					stroke="none"
					d="M2.948 1047.39H5.97V1048.3860000000002H2.948z"
				></path>
				<path
					fill="#286296"
					stroke="none"
					d="M2 1045.362v7h1v-3h2v-1H3v-2h3v-1H2z"
				></path>
			</g>
		</svg>
	);
});

export default AbapDecoratorFinalMember;
