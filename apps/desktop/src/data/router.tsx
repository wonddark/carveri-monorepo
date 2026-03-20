import type { LoaderFunctionArgs } from 'react-router'
import { createBrowserRouter } from 'react-router'
import RootLayout from '@/layout/root.tsx'
import ReportError from '@/pages/ReportError.tsx'
import ReportPage from '@/pages/ReportPage.tsx'
import { fetchVehicleReport } from '@carveri/shared/data/api'

async function reportLoader({ params }: LoaderFunctionArgs) {
  if (!params.vin) throw new Response('Not Found', { status: 404 })
  return fetchVehicleReport(params.vin)
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <div className="p-8 text-lg font-semibold">
            CarVeri Desktop — coming soon
          </div>
        ),
      },
      {
        path: 'reports/:vin',
        element: <ReportPage />,
        loader: reportLoader,
        errorElement: <ReportError />,
      },
    ],
  },
])

export default router
