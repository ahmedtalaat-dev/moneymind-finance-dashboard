// Imports
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { StatCardProps } from "@/types";

// Main Component
export function StatCard({
  title,
  value,
  description,
  icon,
  trend,
  trendValue,
  className,
}: StatCardProps) {
  return (
    <Card className={className}>
      {/* Card header (title + icon) */}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-bold">{title}</CardTitle>
        {icon && <div className="text-2xl">{icon}</div>}
      </CardHeader>

      {/* Card content (value + description/trend) */}
      <CardContent>
        {/* Main value */}
        <div className="text-2xl font-bold">{value}</div>

        {/* Optional description or trend info */}
        {(description || trendValue) && (
          <p
            className={cn(
              "text-xs mt-1",
              // Green for positive trend
              trend === "up"
                ? "text-green-600 dark:text-green-400"
                : // Red for negative trend
                  trend === "down"
                  ? "text-red-600 dark:text-red-400"
                  : // Default muted color
                    "text-muted-foreground",
            )}
          >
            {/* Show arrow + trend text if trend exists */}
            {trendValue && trend
              ? `${trend === "up" ? "↑" : "↓"} ${trendValue}`
              : description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
