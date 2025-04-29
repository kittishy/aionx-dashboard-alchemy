
export function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] py-16">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-primary/30" />
        <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin" />
      </div>
      <p className="mt-4 text-muted-foreground text-sm">
        Carregando...
      </p>
    </div>
  );
}
