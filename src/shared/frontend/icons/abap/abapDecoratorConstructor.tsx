import * as React from "react";
import { IconProps } from "shared/frontend/icons/types";

/**
 * Sacado de https://tailwindtoolbox.com/icons
 */
export const AbapDecoratorConstructor = React.forwardRef<
	SVGSVGElement,
	IconProps
>(({ color = "currentColor", ...props }, forwardedRef) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			width="7"
			height="8"
			version="1.1"
		>
			<defs>
				<linearGradient id="linearGradient3796">
					<stop
						offset="0"
						stopColor="#14733c"
						stopOpacity="0"
					></stop>
					<stop
						offset="1"
						stopColor="#14733c"
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
						stopColor="#a4c589"
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
					xlinkHref="#linearGradient10798-1-9-3-7-6-8-9-0-9-1-7"
				></linearGradient>
				<linearGradient id="linearGradient10798-1-9-3-7-6-8-9-0-9-1-7">
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
						stopColor="#a4c589"
						stopOpacity="1"
					></stop>
				</linearGradient>
				<radialGradient
					cx="388.125"
					cy="468.237"
					r="11.708"
					fx="388.125"
					fy="468.237"
					gradientTransform="matrix(.86594 0 0 .86594 52.03 62.77)"
					gradientUnits="userSpaceOnUse"
					xlinkHref="#linearGradient3796"
				></radialGradient>
			</defs>
			<g
				strokeOpacity="1"
				transform="translate(0 -1044.362)"
			>
				<ellipse
					cx="3.471"
					cy="1050.275"
					fill="#fff"
					fillOpacity="1"
					stroke="none"
					opacity="1"
					rx="2.467"
					ry="1.083"
				></ellipse>
				<path
					fill="#fff"
					fillOpacity="1"
					fillRule="evenodd"
					stroke="none"
					strokeLinecap="butt"
					strokeLinejoin="miter"
					strokeWidth="1"
					d="M.994 1044.344s.027 6.158 0 6.061c-.026-.097 5.007 0 5.007 0v-6.029z"
				></path>
				<path
					fill="none"
					fillRule="evenodd"
					stroke="#fff"
					strokeDasharray="none"
					strokeLinecap="butt"
					strokeLinejoin="miter"
					strokeMiterlimit="4"
					strokeWidth="1.01"
					d="M5.476 1049.306v.5s-.533 1.05-1.506 1.05H2.78c-.516 0-1.125-.77-1.125-.928l-.148-.688v-.886"
				></path>
				<g
					fillRule="evenodd"
					strokeLinecap="butt"
					strokeLinejoin="miter"
				>
					<path
						fill="#fff"
						fillOpacity="1"
						stroke="none"
						strokeWidth="1"
						d="M6.038 1048.891s-.938.904-1.217.904c-.279 0-1.372-.01-1.584-.19-.212-.178-.76-1.004-.77-1.06-.012-.056.156-2.578.167-2.745.011-.168.424-.882.491-.882s1.496.078 1.551.089c.056.011.916.68.916.68l.435.19z"
					></path>
					<path
						fill="none"
						stroke="#40b659"
						strokeDasharray="none"
						strokeMiterlimit="4"
						strokeWidth="1.01"
						d="M4.625 1048.367v.5s-.102 1.05-1.075 1.05h-.964s-1.078-.012-1.078-1.053v-3.04s.147-.948.97-.948h1.117c1.103.185 1.017.726 1.005 1.493"
					></path>
					<path
						fill="none"
						stroke="#227e35"
						strokeDasharray="none"
						strokeMiterlimit="4"
						strokeWidth="0.95"
						d="M5.558 1046.347v-.48s.005-1.027-1.027-1.027H3.438c-.805 0-.95.949-.95.949v3.046c0 1.043.486 1.055 1.056 1.055h.943c.952 0 1.052-1.052 1.052-1.052v-.471"
					></path>
				</g>
			</g>
		</svg>
	);
});

export default AbapDecoratorConstructor;
