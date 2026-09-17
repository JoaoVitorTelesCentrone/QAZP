'use client'

import withAuth from '../hoc/withAuth'
import { useDashboard } from './hooks/useDashboard'
import DashboardView from './DashboardView'

function DashboardPage() {
  const dashboard = useDashboard()
  return <DashboardView {...dashboard} />
}

export default withAuth(DashboardPage)
