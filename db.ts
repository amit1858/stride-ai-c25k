import OnboardingWizard from "@/components/OnboardingWizard";
import CoachChat from "@/components/CoachChat";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 py-10">
      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-500">AI-native Couch-to-5K</p>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
          From “I should start running” to a confident 5K.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-neutral-600">
          StrideAI builds your plan, coaches each run, adapts after every check-in, and keeps the habit gentle enough to stick.
        </p>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <OnboardingWizard />
        <CoachChat />
      </div>
    </main>
  );
}
