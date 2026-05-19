/*
 * Base skeleton primitive.
 * Provides a small themed loading block for composing placeholder UIs.
 */

import { cn } from "@/lib/utils";

const Skeleton = ({className, ...props}: React.ComponentProps<"div">) => {
	return (
		<div
			data-slot="skeleton"
			className={cn("bg-accent animate-pulse rounded-md", className)}
			{...props}
		/>
	)
}

export { Skeleton }
