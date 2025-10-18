import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Twitter } from "lucide-react";
import silentSeaLogo from "@/assets/silent-sea-logo.png";
import ThreeBackground from "./ThreeBackground";
import { Shield, Zap, Solana } from "./icons";

const Waitlist = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    if (!validateEmail(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${apiUrl}/api/waitlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to join waitlist");
      }

      setIsSuccess(true);
      toast({
        title: "Success!",
        description:
          "You've been added to the waitlist. We'll be in touch soon.",
      });
      setEmail("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to join waitlist. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ThreeBackground />
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-xl animate-fade-in">
          <div className="text-center space-y-8">
            {/* Logo */}
            <div className="flex justify-center mb-12">
              <img
                src={silentSeaLogo}
                alt="Silent Sea"
                className="w-20 h-20 object-contain opacity-90"
              />
            </div>

            {/* Heading */}
            <div className="space-y-6 animate-slide-up">
              <h1 className="text-4xl md:text-5xl font-bold tracking-wider leading-tight text-primary-foreground">
                SILENT SEA
              </h1>
              <div className="h-px w-16 bg-primary mx-auto" />
              <p className="text-base md:text-lg text-foreground/80 font-light tracking-wide">
                Confidential Orderbook Trading on Solana
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-col md:flex-row justify-center gap-8 py-8">
              <div className="flex flex-col items-center gap-2 text-sm">
                <Shield className="w-5 h-5 text-secondary" />
                <span className="text-foreground/70">Private</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-sm">
                <Zap className="w-5 h-5 text-secondary" />
                <span className="text-foreground/70">Fast</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-sm">
                <Solana className="w-5 h-5 text-secondary" />
                <span className="text-foreground/70">Solana</span>
              </div>
            </div>

            {/* Waitlist Form */}
            {!isSuccess ? (
              <form
                onSubmit={handleSubmit}
                className="space-y-6 max-w-sm mx-auto"
              >
                <div className="space-y-4">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="h-12 text-center bg-transparent border border-foreground/20 hover:border-foreground/30 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors placeholder:text-foreground/40 text-sm"
                  />
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground border-0 focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin" />
                        Joining
                      </>
                    ) : (
                      "Join Waitlist"
                    )}
                  </Button>
                </div>
                <p className="text-xs text-foreground/50 leading-relaxed">
                  Early access to confidential trading
                </p>
              </form>
            ) : (
              <div className="max-w-sm mx-auto p-8 border border-primary/30 bg-background/30 backdrop-blur-sm space-y-6 rounded-lg">
                <div className="w-16 h-16 mx-auto border-2 border-secondary rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-secondary rounded-full" />
                </div>
                <h2 className="text-2xl font-bold tracking-wider text-primary-foreground">
                  You're on the list
                </h2>
                <p className="text-foreground/60 text-sm leading-relaxed">
                  We'll be in touch with you soon.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <footer className="mt-20 text-center space-y-6">
            <div className="h-px w-24 bg-border/50 mx-auto" />
            <div className="flex justify-center">
              <a
                href="https://x.com/silentsea_xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-foreground/50 hover:text-primary transition-colors text-sm"
              >
                <Twitter className="w-4 h-4" />
                <span>@silentsea_xyz</span>
              </a>
            </div>
            <p className="text-xs text-foreground/40">© 2025 Silent Sea</p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Waitlist;
