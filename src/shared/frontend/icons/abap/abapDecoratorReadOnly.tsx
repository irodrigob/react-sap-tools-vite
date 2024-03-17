import * as React from "react";
import { IconProps } from "shared/frontend/icons/types";

/**
 * Sacado de https://tailwindtoolbox.com/icons
 */
export const AbapDecoratorReadOnly = React.forwardRef<SVGSVGElement, IconProps>(
	({ color = "currentColor", ...props }, forwardedRef) => {
		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlnsXlink="http://www.w3.org/1999/xlink"
				width="7"
				height="8"
				version="1.1"
			>
				<defs>
					<linearGradient>
						<stop
							offset="0"
							stopColor="#a4b1c7"
							stopOpacity="1"
						></stop>
						<stop
							offset="0.5"
							stopColor="#e1e9f8"
							stopOpacity="0"
						></stop>
						<stop
							offset="1"
							stopColor="#e7eefa"
							stopOpacity="0"
						></stop>
					</linearGradient>
					<linearGradient>
						<stop
							offset="0"
							stopColor="#a4b1c7"
							stopOpacity="1"
						></stop>
						<stop
							offset="0.25"
							stopColor="#e1e9f8"
							stopOpacity="1"
						></stop>
						<stop
							offset="1"
							stopColor="#e7eefa"
							stopOpacity="1"
						></stop>
					</linearGradient>
					<linearGradient>
						<stop
							offset="0"
							stopColor="#a79c68"
							stopOpacity="1"
						></stop>
						<stop
							offset="0.319"
							stopColor="#687692"
							stopOpacity="1"
						></stop>
						<stop
							offset="0.426"
							stopColor="#8c99a6"
							stopOpacity="1"
						></stop>
						<stop
							offset="0.672"
							stopColor="#7b8da7"
							stopOpacity="1"
						></stop>
						<stop
							offset="1"
							stopColor="#5e78a8"
							stopOpacity="1"
						></stop>
					</linearGradient>
					<linearGradient id="linearGradient4862">
						<stop
							offset="0"
							stopColor="#937323"
							stopOpacity="1"
						></stop>
						<stop
							offset="1"
							stopColor="#79601d"
							stopOpacity="1"
						></stop>
					</linearGradient>
					<linearGradient id="linearGradient4886">
						<stop
							offset="0"
							stopColor="#dec26f"
							stopOpacity="1"
						></stop>
						<stop
							offset="1"
							stopColor="#fce69e"
							stopOpacity="1"
						></stop>
					</linearGradient>
					<linearGradient id="linearGradient5156">
						<stop
							offset="0"
							stopColor="#fdf3cb"
							stopOpacity="1"
						></stop>
						<stop
							offset="0.486"
							stopColor="#fdf3cb"
							stopOpacity="1"
						></stop>
						<stop
							offset="0.565"
							stopColor="#a77e1c"
							stopOpacity="0.502"
						></stop>
						<stop
							offset="1"
							stopColor="#a77e1c"
							stopOpacity="0.5"
						></stop>
					</linearGradient>
					<filter
						id="filter5152"
						colorInterpolationFilters="sRGB"
					>
						<feGaussianBlur stdDeviation="0.324"></feGaussianBlur>
					</filter>
					<linearGradient id="linearGradient4878">
						<stop
							offset="0"
							stopColor="#925218"
							stopOpacity="1"
						></stop>
						<stop
							offset="1"
							stopColor="#c1aa38"
							stopOpacity="1"
						></stop>
					</linearGradient>
					<linearGradient
						id="linearGradient8465"
						x1="30.063"
						x2="30.063"
						y1="1034.496"
						y2="1040.971"
						gradientTransform="translate(-42.735 2.5)"
						gradientUnits="userSpaceOnUse"
						xlinkHref="#linearGradient4862"
					></linearGradient>
					<linearGradient
						id="linearGradient8469"
						x1="32.326"
						x2="32.326"
						y1="1049.994"
						y2="1040.736"
						gradientTransform="translate(-43.39 1.055)"
						gradientUnits="userSpaceOnUse"
						xlinkHref="#linearGradient4886"
					></linearGradient>
					<linearGradient
						id="linearGradient8471"
						x1="27.208"
						x2="32.558"
						y1="1041.838"
						y2="1049.788"
						gradientTransform="translate(-43.39 1.055)"
						gradientUnits="userSpaceOnUse"
						xlinkHref="#linearGradient5156"
					></linearGradient>
					<linearGradient
						id="linearGradient8473"
						x1="29.263"
						x2="29.263"
						y1="1048.656"
						y2="1040.78"
						gradientTransform="translate(-43.39 1.055)"
						gradientUnits="userSpaceOnUse"
						xlinkHref="#linearGradient4878"
					></linearGradient>
					<mask maskUnits="userSpaceOnUse">
						<rect
							width="14"
							height="14"
							x="1"
							y="1037.362"
							fill="#fff"
							fillOpacity="1"
							stroke="none"
							rx="0.671"
							ry="0.671"
						></rect>
					</mask>
				</defs>
				<g
					display="inline"
					transform="translate(0 -1036.362)"
				>
					<g transform="matrix(.52905 0 0 .49708 10.98 521.534)">
						<path
							style={{
								lineHeight: "normal",
								InkscapeFontSpecification: "Sans",
								WebkitTextIndent: "0",
								textIndent: "0",
								WebkitTextAlign: "start",
								textAlign: "start",
								WebkitTextDecorationLine: "none",
								textDecorationLine: "none",
								WebkitTextTransform: "none",
								textTransform: "none",
								marker: "none",
							}}
							fill="none"
							stroke="url(#linearGradient8465)"
							strokeDasharray="none"
							strokeMiterlimit="4"
							strokeOpacity="1"
							strokeWidth="2.471"
							d="M-10.06 1045.062v-2.938c0-2.758-1.253-5-4.012-5-2.758 0-4.163 2.242-4.163 5v2.938"
							baselineShift="baseline"
							color="#000"
							direction="ltr"
							display="inline"
							enableBackground="accumulate"
							fontFamily="Sans"
							fontSize="medium"
							fontStretch="normal"
							fontStyle="normal"
							fontVariant="normal"
							fontWeight="normal"
							letterSpacing="normal"
							overflow="visible"
							textAnchor="start"
							textDecoration="none"
							visibility="visible"
							wordSpacing="normal"
							writingMode="lr-tb"
						></path>
						<rect
							width="11.999"
							height="7.938"
							x="-19.876"
							y="1042.982"
							fill="url(#linearGradient8469)"
							fillOpacity="1"
							stroke="none"
							display="inline"
							rx="1.105"
							ry="1.105"
						></rect>
						<rect
							width="10.729"
							height="6.824"
							x="-19.242"
							y="1043.485"
							fill="none"
							stroke="url(#linearGradient8471)"
							strokeOpacity="1"
							strokeWidth="0.879"
							display="inline"
							filter="url(#filter5152)"
							rx="0.622"
							ry="0.601"
						></rect>
						<path
							fill="#a77e1c"
							fillOpacity="1"
							stroke="none"
							d="M-19.393 1045.48H-8.362V1046.48H-19.393z"
							display="inline"
							opacity="0.25"
						></path>
						<path
							fill="#a77e1c"
							fillOpacity="1"
							stroke="none"
							d="M-19.393 1047.48H-8.362V1048.48H-19.393z"
							display="inline"
							opacity="0.25"
						></path>
						<path
							fill="#a77e1c"
							fillOpacity="1"
							stroke="none"
							d="M-19.393 1049.48H-8.362V1050.48H-19.393z"
							display="inline"
							opacity="0.25"
						></path>
						<circle
							cx="9.48"
							cy="12.531"
							r="1.016"
							fill="#785b13"
							fillOpacity="1"
							stroke="none"
							display="inline"
							transform="translate(-23.39 1033.418)"
						></circle>
						<path
							fill="#785b13"
							fillOpacity="1"
							stroke="none"
							d="M-14.44 1046.59H-13.379V1049.396H-14.44z"
							display="inline"
						></path>
						<rect
							width="11.51"
							height="8.229"
							x="-19.876"
							y="1042.691"
							fill="none"
							stroke="url(#linearGradient8473)"
							strokeDasharray="none"
							strokeMiterlimit="4"
							strokeOpacity="1"
							strokeWidth="1.647"
							display="inline"
							rx="1.105"
							ry="1.105"
						></rect>
					</g>
				</g>
			</svg>
		);
	}
);

export default AbapDecoratorReadOnly;
