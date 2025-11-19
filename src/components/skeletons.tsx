import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export const DashboardSkeleton = () => {
    return (
        <div className="space-y-6">
            {/* Stats Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[...Array(4)].map((_, i) => (
                    <Card key={i} className="p-6 border-border">
                        <div className="flex items-start justify-between">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-8 w-16" />
                                <Skeleton className="h-4 w-20" />
                            </div>
                            <Skeleton className="h-12 w-12 rounded-xl" />
                        </div>
                    </Card>
                ))}
            </div>

            {/* Recent Activity Skeleton */}
            <Card className="p-6 border-border">
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center gap-4 p-3">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-4 w-48" />
                                <Skeleton className="h-3 w-24" />
                            </div>
                            <Skeleton className="h-8 w-16" />
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export const PropertyCardSkeleton = () => {
    return (
        <Card className="p-4 sm:p-6 border-border">
            <div className="flex gap-3 sm:gap-4">
                <Skeleton className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl flex-shrink-0" />
                <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex justify-between gap-2">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-6 w-16 rounded-lg" />
                    </div>
                    <div className="space-y-1">
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-1/3" />
                    </div>
                    <div className="flex gap-2 pt-2">
                        <Skeleton className="h-8 flex-1 rounded-lg" />
                        <Skeleton className="h-8 flex-1 rounded-lg" />
                        <Skeleton className="h-8 w-10 rounded-lg" />
                    </div>
                </div>
            </div>
        </Card>
    );
};

export const TableRowSkeleton = () => {
    return (
        <div className="flex items-center space-x-4 py-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
    );
};

export const LocationSkeleton = () => {
    return (
        <Card className="px-4 py-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-48" />
                    </div>
                </div>
                <div className="flex gap-2">
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                </div>
            </div>
        </Card>
    );
};

export const ReviewSkeleton = () => {
    return (
        <Card className="p-6 border-border">
            <div className="flex items-start gap-4">
                <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />
                <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex justify-between gap-2">
                        <div className="space-y-1">
                            <Skeleton className="h-5 w-32" />
                            <Skeleton className="h-4 w-48" />
                        </div>
                        <Skeleton className="h-6 w-20 rounded-lg" />
                    </div>
                    <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Skeleton key={i} className="h-4 w-4" />
                        ))}
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-24 mt-2" />
                    <div className="flex gap-2 pt-2">
                        <Skeleton className="h-8 w-24 rounded-lg" />
                        <Skeleton className="h-8 w-8 rounded-lg" />
                    </div>
                </div>
            </div>
        </Card>
    );
};
