import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonRow() {
    return (
        <tr>
            {Array(6).fill(0).map((_, i) => (
                <td key={i} className="px-4 py-2">
                    <Skeleton className="h-4 w-full" />
                </td>
            ))}
        </tr>
    );
}