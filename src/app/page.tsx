import { Button } from '@/common/components/ui/button';

export default function Page() {
  return (
    <main className="flex-1">
      <div className="flex min-h-svh flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">
          A Next.js starter kit for your next solution
        </h1>
        <Button>Get Started</Button>
      </div>
    </main>
  );
}
