import { cn } from "@/lib/utils";

export interface ISVGProps extends React.SVGProps<SVGSVGElement> {
	size?: number;
	className?: string;
	text?: string;
}

export const LoadingSpinner = ({
	size = 24,
	className,
	text,
	...props
}: ISVGProps) => {
	return (
		<div className="flex flex-row items-center space-x-4">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				{...props}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className={cn("animate-spin", className)}
			>
				<path d="M21 12a9 9 0 1 1-6.219-8.56" />
			</svg>
			{text != "" && <h5 className="italic text-lg">{text}</h5>}
		</div>
	);
};
