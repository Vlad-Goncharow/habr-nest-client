import {QueryClientProvider} from '@tanstack/react-query';
import { ReactNode } from "react";
import { queryClient } from "shared/api/query-client";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

interface QueryProviderProps{
  children:ReactNode
}

export const QueryProvider: React.FC<QueryProviderProps> = ({children}) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  )
}