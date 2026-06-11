// Imports
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Recommendations data
const RECOMMENDATIONS = [
  {
    title: "Improve Budget Control",
    description: "Set monthly limits for each category to avoid overspending.",
  },
  {
    title: "Increase Savings Rate",
    description: "Try to save at least 20% of your monthly income.",
  },
  {
    title: "Review Subscriptions",
    description: "Cancel unused subscriptions to reduce monthly expenses.",
  },
];

export function InsightsRecommendations() {
  return (
    <Card>
      {/* Section header */}
      <CardHeader>
        <CardTitle>Recommendations</CardTitle>

        <CardDescription>
          Smart suggestions based on your spending behavior
        </CardDescription>
      </CardHeader>

      {/* Recommendations list */}
      <CardContent className="space-y-3">
        {RECOMMENDATIONS.map((recommendation) => (
          <div key={recommendation.title} className="rounded bg-muted p-3">
            {/* Recommendation title */}
            <h4 className="font-medium">{recommendation.title}</h4>

            {/* Recommendation description */}
            <p className="text-sm text-muted-foreground">
              {recommendation.description}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
