import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import CategoryTable from "./_components/CategoryTable";

export default function CategoryDashboard() {
    return (
        <Suspense
            fallback={
                <div className="flex gap-4 p-8 animate-pulse">
                    <div className="w-64 space-y-4">
                        <Skeleton className="h-24 w-24 rounded-full mx-auto" />
                        <Skeleton className="h-4 w-3/4 mx-auto" />
                        <Skeleton className="h-3 w-1/2 mx-auto" />
                    </div>
                    <div className="flex-1 space-y-6">
                        <Skeleton className="h-10 w-1/3" />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Skeleton className="h-32" />
                            <Skeleton className="h-32" />
                            <Skeleton className="h-32" />
                        </div>
                        <Skeleton className="h-96" />
                    </div>
                </div>
            }
        >
            <CategoryTable />
        </Suspense>

    );

}
