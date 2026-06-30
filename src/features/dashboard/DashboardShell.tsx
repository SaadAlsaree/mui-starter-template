'use client';
import dynamic from 'next/dynamic';
import DashboardSkeleton from './DashboardSkeleton';

const Dashboard = dynamic(() => import('./DashboardContent'), {
  ssr: false,
  loading: () => <DashboardSkeleton />,
});

export default function DashboardShell() {
  return <Dashboard />;
}
