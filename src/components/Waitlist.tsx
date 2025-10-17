import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Loader2 } from "lucide-react";

export function Waitlist() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error" | null;
    text: string;
  }>({ type: null, text: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: null, text: "" });

    try {
      const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "";
      const response = await fetch(`${apiBaseUrl}/api/waitlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: "success", text: data.message });
        setEmail("");
      } else {
        setMessage({ type: "error", text: data.message });
      }
    } catch {
      setMessage({
        type: "error",
        text: "Failed to connect to server. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary-bg flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-block">
            <h1 className="text-5xl md:text-7xl font-bold text-primary-text tracking-wider retro-glow">
              SILENT SEA
            </h1>
            <div className="h-1 bg-gradient-to-r from-transparent via-primary-accent to-transparent mt-2"></div>
          </div>
          <p className="text-xl md:text-2xl text-primary-accent font-mono">
            Dark Pool DEX • Confidential Trading
          </p>
          <p className="text-lg text-primary-text/80 max-w-xl mx-auto">
            The future of private, secure trading on Solana. Join the waitlist
            to be the first to access our revolutionary dark pool orderbook.
          </p>
        </div>

        {/* Waitlist Form */}
        <div className="bg-primary-bg border-2 border-primary-accent/30 rounded-lg p-8 shadow-2xl backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-primary-text block"
              >
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="text-lg py-6"
              />
            </div>

            <Button
              type="submit"
              disabled={loading || !email}
              className="w-full text-lg py-6 font-semibold uppercase tracking-wider"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Joining Waitlist...
                </>
              ) : (
                "Join Waitlist"
              )}
            </Button>

            {message.type && (
              <div
                className={`p-4 rounded-md text-center font-medium ${
                  message.type === "success"
                    ? "bg-secondary-accent/20 text-secondary-accent border border-secondary-accent/30"
                    : "bg-primary-accent/20 text-primary-accent border border-primary-accent/30"
                }`}
              >
                {message.text}
              </div>
            )}
          </form>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="space-y-2">
            <div className="text-3xl text-primary-accent">🔒</div>
            <h3 className="text-lg font-semibold text-primary-text">
              Confidential
            </h3>
            <p className="text-sm text-primary-text/70">
              Orders hidden in TEE environment
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-3xl text-primary-accent">⚡</div>
            <h3 className="text-lg font-semibold text-primary-text">
              Fast Settlement
            </h3>
            <p className="text-sm text-primary-text/70">
              Powered by Solana blockchain
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-3xl text-primary-accent">🛡️</div>
            <h3 className="text-lg font-semibold text-primary-text">Secure</h3>
            <p className="text-sm text-primary-text/70">
              Zero-knowledge proofs verified
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-primary-text/50 text-sm font-mono">
          <p>Solana Cypherpunk Hackathon 2025</p>
        </div>
      </div>
    </div>
  );
}
