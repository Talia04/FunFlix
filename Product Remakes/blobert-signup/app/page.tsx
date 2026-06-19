import { SignupController } from "@/components/SignupFlow/SignupController";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,#fff176_0,#ff9ed8_28%,#8b5cf6_62%,#4c1d95_100%)] px-4 py-6 text-ink sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-6xl flex-col items-center justify-center gap-5">
        <header className="w-full text-center">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-white/80">
            Day 1 of building useless tech
          </p>
          <h1 className="mt-2 text-4xl font-black leading-none text-white drop-shadow-lg sm:text-6xl">
            Blobert
          </h1>
          <p className="mt-2 text-base font-bold text-white/90 sm:text-xl">
            Feed him your credentials. Regret it immediately.
          </p>
        </header>
        <SignupController />
      </div>
    </main>
  );
}
