export function StepWelcome() {
  return (
    <div className="space-y-6 text-center">
      <img
        src="/lifebuddy-mascot.png"
        className="mx-auto h-24 w-24"
        alt="Mascot"
      />

      <h1 className="text-3xl font-bold">Welcome to LifeBuddy 👋</h1>

      <p className="text-muted-foreground text-sm max-w-sm mx-auto">
        Let’s get to know you so we can build your AI Biographer.
      </p>
    </div>
  );
}
