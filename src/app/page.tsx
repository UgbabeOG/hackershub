import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/common/logo';
import { Footer } from '@/components/common/footer';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Shield, TrendingUp, Users } from 'lucide-react';
import Image from 'next/image';

const features = [
  {
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
    title: 'AI-Powered Analysis',
    description:
      'Leverage cutting-edge AI to analyze your case, identify recovery pathways, and maximize your chances of success.',
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'Expert Investigators',
    description:
      'Our team of seasoned recovery specialists and investigators will guide you through every step of the process.',
  },
  {
    icon: <Shield className="h-8 w-8 text-primary" />,
    title: 'Secure & Confidential',
    description:
      'Your data is protected with bank-level security, and all communications are encrypted and confidential.',
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 border-b bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Logo className="h-8 w-8 text-primary" />
            <span className="font-headline text-2xl text-primary">
              HackersHub
            </span>
          </Link>
          <Button asChild>
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative h-[60vh] min-h-[400px] w-full">
          <Image
            src="https://picsum.photos/seed/hacker-bg/1800/1200"
            alt="Cyber security background"
            fill
            className="object-cover"
            data-ai-hint="cyber security"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-primary-foreground">
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl font-headline">
              Reclaim What's Yours
            </h1>
            <p className="mt-4 max-w-3xl text-lg md:text-xl">
              RavensResearch combines AI and expert investigators to recover
              funds lost to online scams and fraud.
            </p>
            <Button size="lg" className="mt-8" asChild>
              <Link href="/login">Start Your Recovery</Link>
            </Button>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-center text-3xl font-bold tracking-tight text-primary font-headline">
              How We Fight For You
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-center text-muted-foreground">
              Our comprehensive approach ensures no stone is left unturned in
              the pursuit of your stolen assets.
            </p>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {features.map((feature, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      {feature.icon}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="font-headline text-xl">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
