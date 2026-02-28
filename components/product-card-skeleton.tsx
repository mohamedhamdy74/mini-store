import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
    return (
        <Card className="overflow-hidden border-zinc-200 dark:border-zinc-800">
            <CardHeader className="p-0">
                <Skeleton className="aspect-square rounded-none" />
            </CardHeader>
            <CardContent className="space-y-4 p-4">
                <Skeleton className="h-4 w-24" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between p-4">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-10 w-24 rounded-full" />
            </CardFooter>
        </Card>
    );
}
