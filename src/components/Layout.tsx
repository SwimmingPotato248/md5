import { signIn, signOut, useSession } from "next-auth/react";
import { type FC, type ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  const { data: session } = useSession();

  return (
    <>
      <nav className="flex">
        {session?.user ? (
          <>
            <div>{session.user.name}</div>
            <button onClick={() => signOut()}>Logout</button>
          </>
        ) : (
          <button
            onClick={() => signIn("credentials")}
            className={
              "rounded-lg border-2 border-blue-600 px-4 py-1 text-neutral-700"
            }
          >
            Login
          </button>
        )}
      </nav>
      <main>{children}</main>
    </>
  );
};

export default Layout;
