import { ReactNode } from "react";
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "react-query";

export function QueryProvider({ children }: { children: ReactNode }) {
  const client = new QueryClient({
    mutationCache: new MutationCache(),
    queryCache: new QueryCache(),
  });

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
