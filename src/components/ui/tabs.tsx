import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";
import { Cross2Icon } from "@radix-ui/react-icons";

interface CustomPropsTrigger {
	onCloseTab?: () => void;
	textTab?: string;
}
const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.List>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
	<TabsPrimitive.List
		ref={ref}
		className={cn(
			"inline-flex h-10 items-center border-b-2 border-l-2 justify-center text-muted-foreground",
			className
		)}
		{...props}
	/>
));
TabsList.displayName = TabsPrimitive.List.displayName;

/*
"inline-flex items-center justify-center whitespace-nowrap border-r-2 px-4 py-3 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-t-2 data-[state=active]:border-t-indigo-500 data-[state=active]:text-foreground data-[state=active]:shadow",
*/
const TabsTrigger = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Trigger> & CustomPropsTrigger,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> &
		CustomPropsTrigger
>(({ className, onCloseTab, ...props }, ref) => (
	<div className="flex grow items-center text-sm font-medium justify-center whitespace-nowrap border-r-2 py-2 px-4 border-t-2 transition-all disabled:pointer-events-none disabled:opacity-50">
		<TabsPrimitive.Trigger
			ref={ref}
			className={cn(
				"inline-flex data-[state=active]:text-foreground data-[state=active]:shadow data-[state=active]:underline data-[state=active]:underline-offset-2 data-[state=active]:decoration-blue-400 data-[state=active]:decoration-2",
				className
			)}
			{...props}
		>
			{props.children}
		</TabsPrimitive.Trigger>
		{onCloseTab && (
			<Cross2Icon
				className="ml-4 h-4 w-4 hover:text-red-600"
				onClick={(event: any) => {
					event.preventDefault();
					onCloseTab();
				}}
			/>
		)}
	</div>
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
	<TabsPrimitive.Content
		ref={ref}
		className={cn(
			"mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
			className
		)}
		{...props}
	/>
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
