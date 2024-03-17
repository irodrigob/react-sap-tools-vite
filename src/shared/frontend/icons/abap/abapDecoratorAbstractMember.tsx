import * as React from "react";
import { IconProps } from "shared/frontend/icons/types";

/**
 * Sacado de https://tailwindtoolbox.com/icons
 */
export const AbapDecoratorAbstractMember = React.forwardRef<
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
					id="linearGradient3774"
					x1="6"
					x2="6"
					y1="1051.362"
					y2="1044.362"
					gradientTransform="translate(-2)"
					gradientUnits="userSpaceOnUse"
					xlinkHref="#linearGradient3768"
				></linearGradient>
			</defs>
			<g
				fillOpacity="1"
				stroke="none"
				transform="translate(0 -1044.362)"
			>
				<path
					fill="#fff"
					fillRule="evenodd"
					strokeLinecap="butt"
					strokeLinejoin="miter"
					strokeOpacity="1"
					strokeWidth="1"
					d="M0 1049.362v3h7v-3l-2-5H2z"
				></path>
				<path
					fill="url(#linearGradient3774)"
					d="M3 1044.362l-2 7h1l.594-2h1.812l.594 2h1l-2-7H3zm.5 2l.594 2H2.906l.594-2z"
				></path>
			</g>
		</svg>
	);
});

export default AbapDecoratorAbstractMember;
