import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from '@tanstack/react-router'

import { queryClient } from './lib/queryClient.ts'
import { router } from './app/router.tsx'
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'


createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
			<Toaster richColors position="top-right" />
		</QueryClientProvider>
	</StrictMode>,
)
