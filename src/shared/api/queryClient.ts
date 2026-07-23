import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 30_000,
      refetchOnWindowFocus: false,
      // MSW serves requests via an in-process service worker, not a real network
      // connection, so the browser's online/offline signal isn't meaningful here.
      networkMode: 'always',
    },
  },
})
