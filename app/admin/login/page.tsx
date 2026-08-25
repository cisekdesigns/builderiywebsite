import { signInWithPassword } from "./actions";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const error = params.error;

  let message: string | null = null;
  if (error === "invalid" || error === "missing") {
    message = "Invalid email or password.";
  } else if (error === "unauthorized") {
    message =
      "This account is signed in but is not a Guide Admin. Access denied.";
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#000000] px-6 text-[#FFFFFF]">
      <div className="w-full max-w-md rounded-[1.5rem] border border-[#2A2A2A] bg-[#121212] p-8">
        <p
          className="text-xl tracking-[0.12em]"
          style={{ fontFamily: "Aboreto, serif" }}
        >
          BUILDERIY GUIDE ADMIN
        </p>
        <p className="mt-3 text-sm text-[#9A9A9A]">
          Sign in with your BuilderiY Staging account.
        </p>

        {message ? (
          <p className="mt-6 rounded-xl border border-[#A64632]/50 bg-[#A64632]/15 px-4 py-3 text-sm text-[#EDEBE4]">
            {message}
          </p>
        ) : null}

        <form action={signInWithPassword} className="mt-8 space-y-4">
          <label className="block">
            <span className="text-xs uppercase tracking-[0.18em] text-[#9A9A9A]">
              Email
            </span>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              className="mt-2 w-full rounded-xl border border-[#2A2A2A] bg-[#1C1C1C] px-4 py-3 text-[#EDEBE4] outline-none focus:border-[#D8D6D1]"
            />
          </label>

          <label className="block">
            <span className="text-xs uppercase tracking-[0.18em] text-[#9A9A9A]">
              Password
            </span>
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              className="mt-2 w-full rounded-xl border border-[#2A2A2A] bg-[#1C1C1C] px-4 py-3 text-[#EDEBE4] outline-none focus:border-[#D8D6D1]"
            />
          </label>

          <button
            type="submit"
            className="mt-2 w-full rounded-2xl border border-[#D8D6D1] bg-[#E6E1D8] px-5 py-3 text-sm font-medium text-[#1F1E1C] transition hover:bg-[#EDEBE4]"
          >
            Sign In
          </button>
        </form>
      </div>
    </main>
  );
}
