interface SkeletonRowProps {
    colCount: number;
}

export function SkeletonRow({ colCount }: SkeletonRowProps) {
    return (
        <tr className="animate-pulse border-t">
            {Array.from({ length: colCount }).map((_, idx) => (
                <td key={idx} className="px-4 py-2">
                    <div className="h-4 bg-gray-200 rounded w-full" />
                </td>
            ))}
        </tr>
    );
}
