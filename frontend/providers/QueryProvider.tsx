import { ReactNode } from "react";
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "react-query";

export function QueryProvider({ children }: { children: ReactNode }) {
  const client = new QueryClient({
    queryCache: new QueryCache(),
    mutationCache: new MutationCache(),
  });

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
