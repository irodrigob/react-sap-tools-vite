import * as React from "react";
import { IconProps } from "shared/frontend/icons/types";

/**
 * Sacado de https://tailwindtoolbox.com/icons
 */
export const AbapClassFriend = React.forwardRef<SVGSVGElement, IconProps>(
	({ color = "currentColor", ...props }, forwardedRef) => {
		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlnsXlink="http://www.w3.org/1999/xlink"
				width="16"
				height="16"
				x="0"
				y="0"
				enableBackground="new 0 0 864 864"
				version="1.1"
				viewBox="0 0 16 16"
				xmlSpace="preserve"
			>
				<defs>
					<linearGradient id="linearGradient4444">
						<stop
							offset="0"
							stopColor="#e3866b"
							stopOpacity="1"
						></stop>
						<stop
							offset="0.333"
							stopColor="#cd4424"
							stopOpacity="1"
						></stop>
						<stop
							offset="0.503"
							stopColor="#cd4424"
							stopOpacity="1"
						></stop>
						<stop
							offset="1"
							stopColor="#e58f69"
							stopOpacity="1"
						></stop>
					</linearGradient>
					<linearGradient id="linearGradient4404">
						<stop
							offset="0"
							stopColor="#e3866b"
							stopOpacity="1"
						></stop>
						<stop
							offset="0.333"
							stopColor="#cd4424"
							stopOpacity="1"
						></stop>
						<stop
							offset="0.503"
							stopColor="#cd4424"
							stopOpacity="1"
						></stop>
						<stop
							offset="1"
							stopColor="#e58f69"
							stopOpacity="1"
						></stop>
					</linearGradient>
					<linearGradient id="linearGradient4267">
						<stop
							offset="0"
							stopColor="#fef285"
							stopOpacity="1"
						></stop>
						<stop
							offset="1"
							stopColor="#fef3b2"
							stopOpacity="0.894"
						></stop>
					</linearGradient>
					<linearGradient id="linearGradient4257">
						<stop
							offset="0"
							stopColor="#c1a465"
							stopOpacity="1"
						></stop>
						<stop
							offset="0.417"
							stopColor="#a68744"
							stopOpacity="1"
						></stop>
						<stop
							offset="1"
							stopColor="#c1a465"
							stopOpacity="1"
						></stop>
					</linearGradient>
					<linearGradient
						id="linearGradient4263"
						x1="7"
						x2="7.297"
						y1="15"
						y2="2"
						gradientUnits="userSpaceOnUse"
						xlinkHref="#linearGradient4257"
					></linearGradient>
					<linearGradient
						id="linearGradient4273"
						x1="5"
						x2="5"
						y1="15"
						y2="6"
						gradientUnits="userSpaceOnUse"
						xlinkHref="#linearGradient4267"
					></linearGradient>
					<filter
						id="filter4381"
						width="1.128"
						height="1.277"
						x="-0.064"
						y="-0.139"
						colorInterpolationFilters="sRGB"
					>
						<feGaussianBlur stdDeviation="0.254"></feGaussianBlur>
					</filter>
					<linearGradient
						id="linearGradient4410"
						x1="5.579"
						x2="5"
						y1="9"
						y2="6"
						gradientUnits="userSpaceOnUse"
						xlinkHref="#linearGradient4444"
					></linearGradient>
					<linearGradient
						id="linearGradient4410-5"
						x1="5.646"
						x2="4.991"
						y1="8.991"
						y2="5.991"
						gradientTransform="matrix(-1 0 0 1 14.991 .009)"
						gradientUnits="userSpaceOnUse"
						xlinkHref="#linearGradient4404"
					></linearGradient>
				</defs>
				<path
					fill="url(#linearGradient4273)"
					fillOpacity="1"
					fillRule="evenodd"
					stroke="url(#linearGradient4263)"
					strokeOpacity="1"
					strokeWidth="1"
					d="M7.503 14.5c-3.39-.045-6.041-2.574-6.003-6.162.036-3.311 2.7-5.76 5.794-5.836 3.63-.088 6.194 2.722 6.206 5.859.013 3.499-2.594 6.102-5.997 6.139z"
					clipRule="evenodd"
				></path>
				<path
					fill="#ffea2e"
					fillOpacity="1"
					stroke="none"
					strokeDasharray="none"
					strokeDashoffset="0"
					strokeLinecap="square"
					strokeLinejoin="miter"
					strokeMiterlimit="4"
					strokeOpacity="1"
					strokeWidth="0.1"
					d="M12 10.658c-.603 1.144-1.899 2.757-4.384 2.757-2.485 0-4.244-1.518-4.616-2.757-.848-2.82 1.898-1.174 4.55-1.08 2.657.093 5.933-1.732 4.45 1.08z"
					filter="url(#filter4381)"
					opacity="0.276"
				></path>
				<path
					fill="url(#linearGradient4410)"
					fillOpacity="1"
					fillRule="evenodd"
					stroke="none"
					strokeDasharray="none"
					strokeMiterlimit="4"
					strokeWidth="0.018"
					d="M3.009 6.73c0-.878.706-1.37 1.4-.974.072.042.142.089.21.139.315.23.376.208.548-.188.04-.09.088-.179.144-.258.295-.418.617-.534 1.002-.367.425.184.741.641.668 1.106a4.191 4.191 0 01-.366 1.136c-.24.502-.543.967-.817 1.448-.122.215-.274.285-.483.15-.543-.348-1.098-.676-1.63-1.047-.37-.258-.673-.598-.676-1.145z"
					clipRule="evenodd"
					opacity="0.75"
				></path>
				<path
					fill="#105c9c"
					fillOpacity="1"
					fillRule="evenodd"
					d="M4.236 10.008a.53.53 0 00-.208.064c-.061.04-.012.217.051.308.675.973 1.958 1.566 3.421 1.62 1.463-.054 2.746-.647 3.42-1.62.064-.091.113-.269.052-.308-.1-.064-.308-.087-.448-.062a5.701 5.701 0 01-3.024.874 5.701 5.701 0 01-3.024-.874.82.82 0 00-.24-.002z"
					clipRule="evenodd"
				></path>
				<image
					width="16"
					height="16"
					x="-16"
					y="0"
					imageRendering="optimizeSpeed"
					preserveAspectRatio="none"
					xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABHNCSVQICAgIfAhkiAAAAQpJREFU KJGdkrFKA0EQhr+JJ9iadIZAgjaBVNanRcBaUoiFtQlcYeFT2FoZrA2CReAewWgRCNhdnSJcGVDI QSDkxia3ureHSH4Y2P13PnaGGVFVtlFpKwrw8sZo0HVKOL16FIdUVROvT9dapI1v5TrQOnl2oggu ZeX5nTbpok+llzAehpB+Mh6GVHoJ6aKP32lbbfz0qF+IzomCNdBEdE79sEkUxIjuoGq36QHEsymS 1pHlCwdHm5cl1pm9S+LZ1IDOOC4e7v68Wz9Waw1UyuC1uD+bsH97YxKiYIJ6LVTKVGsN40u2OaNB V/3zY2T15o5s94T38MOapwF/w3nlIQfM4DxYtDkO+F99A6tLvqKe1pmJAAAAAElFTkSuQmCC"
				></image>
				<path
					fill="url(#linearGradient4410-5)"
					fillOpacity="1"
					fillRule="evenodd"
					stroke="none"
					strokeDasharray="none"
					strokeMiterlimit="4"
					strokeWidth="0.018"
					d="M11.982 6.739c0-.878-.706-1.37-1.4-.974a2.26 2.26 0 00-.21.138c-.315.23-.376.208-.548-.187a1.465 1.465 0 00-.144-.258c-.295-.418-.617-.534-1.002-.367-.425.184-.74.641-.667 1.106.062.392.196.784.365 1.136.24.502.543.966.817 1.448.123.215.274.285.483.15.544-.349 1.099-.676 1.63-1.047.37-.258.673-.598.676-1.145z"
					clipRule="evenodd"
					opacity="0.75"
				></path>
			</svg>
		);
	}
);

export default AbapClassFriend;
