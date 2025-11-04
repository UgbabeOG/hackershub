import { LoginForm } from "@/components/auth/login-form";
import { Logo } from "@/components/common/logo";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="flex flex-col items-center space-y-4">
        <Logo className="h-16 w-16 text-primary" />
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-primary font-headline">
            HackersHub
          </h1>
          <p className="text-muted-foreground">by RavensResearch</p>
        </div>
      </div>
      <div className="mt-8 w-full max-w-sm">
        <LoginForm />
      </div>
    </main>
  );
}
