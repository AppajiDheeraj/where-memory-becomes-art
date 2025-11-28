export function StepFinal() {
  return (
    <div className="space-y-6 text-center">
      <h1 className="text-3xl font-bold">Say hello to your Biographer</h1>
      <p className="text-muted-foreground text-sm max-w-sm mx-auto">
        Talk about your life, memories, or feelings — your AI listens.
      </p>

      <img src="/ai-avatar.png" className="mx-auto h-40" />

      <div className="flex justify-center gap-4 pt-4">
        <div className="p-3 rounded-full bg-muted">🎤</div>
        <div className="p-3 rounded-full bg-muted">📄</div>
        <div className="p-3 rounded-full bg-muted">🧠</div>
      </div>
    </div>
  );
}
