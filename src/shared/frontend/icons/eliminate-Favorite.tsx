import * as React from "react";
import { IconProps } from "./types";

/**
 * Sacado de https://tailwindtoolbox.com/icons
 */
export const EliminateFavorite = React.forwardRef<SVGSVGElement, IconProps>(
	({ color = "currentColor", ...props }, forwardedRef) => {
		return (
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				strokeWidth="2"
				stroke="currentColor"
				fill="none"
				strokeLinecap="round"
				strokeLinejoin="round"
				{...props}
				ref={forwardedRef}
			>
				{" "}
				<path
					stroke="none"
					d="M0 0h24v24H0z"
				/>{" "}
				<path d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2" />{" "}
				<line
					x1="12"
					y1="10"
					x2="12"
					y2="16"
				/>{" "}
				<line
					x1="9"
					y1="13"
					x2="15"
					y2="13"
				/>
			</svg>
		);
	}
);

export default EliminateFavorite;
