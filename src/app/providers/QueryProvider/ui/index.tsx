import {QueryClientProvider} from '@tanstack/react-query';
import { ReactNode } from "react";
import { queryClient } from "shared/api/query-client";

interface QueryProviderProps{
  children:ReactNode
}

export const QueryProvider: React.FC<QueryProviderProps> = ({children}) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}