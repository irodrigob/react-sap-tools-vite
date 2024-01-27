import * as React from "react";
import { IconProps } from "./types";

export const AddFavorite = React.forwardRef<SVGSVGElement, IconProps>(
	({ color = "currentColor", ...props }, forwardedRef) => {
		return (
			<svg
				width="15"
				height="15"
				viewBox="0 0 15 15"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				{...props}
				ref={forwardedRef}
			>
				<path
					d="M7 160h145q5 0 7-5L218 5q3-5 7-5t6 5l59 150q2 5 6 5h145q5 0 7 5t-2 8l-115 88q-3 3-2 8l12 32-82 60-31-22q-2-2-4-2l-1 1h-1q-1 0-2 1L67 447q-1 1-4 1t-5.5-2.5-.5-6.5l63-170q2-5-3-8L3 173q-4-3-2.5-8t6.5-5zm281 224h96v-96h32v96h96v32h-96v96h-32v-96h-96v-32z"
					fill={color}
					fillRule="evenodd"
					clipRule="evenodd"
				/>
			</svg>
		);
	}
);

export default AddFavorite;
