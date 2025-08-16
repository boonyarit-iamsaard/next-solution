import { Button } from '@next-solution/ui/components/base/button'

export default function Page() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center">
      <section className="w-full max-w-3xl p-4 flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">Welcome to Next Solution - Admin Portal</h1>
        <Button>
          Get started
        </Button>
      </section>
    </main>
  )
}
