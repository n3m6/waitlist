import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Waitlist } from "./Waitlist";

// Mock fetch
global.fetch = vi.fn();

describe("Waitlist", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the waitlist page", () => {
    render(<Waitlist />);
    expect(screen.getByText("SILENT SEA")).toBeInTheDocument();
    expect(screen.getByText(/Dark Pool DEX/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("your@email.com")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Join Waitlist/i }),
    ).toBeInTheDocument();
  });

  it("should disable submit button when email is empty", () => {
    render(<Waitlist />);
    const button = screen.getByRole("button", { name: /Join Waitlist/i });
    expect(button).toBeDisabled();
  });

  it("should enable submit button when email is entered", () => {
    render(<Waitlist />);
    const input = screen.getByPlaceholderText("your@email.com");
    const button = screen.getByRole("button", { name: /Join Waitlist/i });

    fireEvent.change(input, { target: { value: "test@example.com" } });

    expect(button).toBeEnabled();
  });

  it("should show success message on successful submission", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, message: "Successfully added!" }),
    } as Response);

    render(<Waitlist />);
    const input = screen.getByPlaceholderText("your@email.com");
    const button = screen.getByRole("button", { name: /Join Waitlist/i });

    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Successfully added!")).toBeInTheDocument();
    });
  });

  it("should show error message on failed submission", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ success: false, message: "Invalid email" }),
    } as Response);

    render(<Waitlist />);
    const input = screen.getByPlaceholderText("your@email.com");
    const button = screen.getByRole("button", { name: /Join Waitlist/i });

    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Invalid email")).toBeInTheDocument();
    });
  });

  it("should show network error message on fetch failure", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error("Network error"),
    );

    render(<Waitlist />);
    const input = screen.getByPlaceholderText("your@email.com");
    const button = screen.getByRole("button", { name: /Join Waitlist/i });

    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(
        screen.getByText("Failed to connect to server. Please try again."),
      ).toBeInTheDocument();
    });
  });
});
