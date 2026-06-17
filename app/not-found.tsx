import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 text-center">
      <p className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
        Error 404
      </p>

      <h1 className="mt-4 text-7xl font-bold tracking-tight md:text-8xl">
        Page Not Found
      </h1>

      <p className="text-muted-foreground mt-6 max-w-md text-lg">
        The page you're looking for doesn't exist or may have been moved.
      </p>

      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>
    </main>
  );
}
