/*
 * Reusable table-shaped loading placeholder.
 * Keeps list pages visually stable while TanStack Query is fetching data.
 */

import { Skeleton } from "@/components/ui/skeleton";

type TableSkeletonProps = {
	rows?: number,
	columns?: number
}

export const TableSkeleton = ({ rows = 5, columns = 4 }: TableSkeletonProps) => {
	return (
		<div className="rounded-md border bg-background">
			<div className="border-b p-3">
				<div
					className="grid gap-4"
					style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
				>
					{Array.from({ length: columns }).map((_, index) => (
						<Skeleton key={index} className="h-4 w-24" />
					))}
				</div>
			</div>

			<div className="divide-y">
				{Array.from({ length: rows }).map((_, rowIndex) => (
					<div
						key={rowIndex}
						className="grid gap-4 p-3"
						style={{
							gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`
						}}
					>
						{Array.from({length: columns}).map((_, columnIndex) => (
							<Skeleton 
								key={columnIndex}
								className={
									columnIndex === columns - 1
										? "ml-auto h-8 w-20"
										: "h-4 w-full max-w-40"	
								}
							/>
						))}
					</div>
				))}
			</div>
		</div>
	)
}
