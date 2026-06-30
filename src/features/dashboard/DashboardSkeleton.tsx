'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

interface DashboardSkeletonProps {
  /** Number of stat cards to show */
  statCards?: number;
  /** Show chart skeletons */
  showCharts?: boolean;
  /** Show DataGrid skeleton */
  showTable?: boolean;
}

export default function DashboardSkeleton({
  statCards = 4,
  showCharts = true,
  showTable = true,
}: DashboardSkeletonProps) {
  return (
    <Box sx={{ px: 3, pb: 5, maxWidth: 1700 }}>
      {/* Heading */}
      <Skeleton variant="text" width={120} height={40} sx={{ mb: 2 }} />

      {/* Stat cards */}
      <Grid container spacing={2} columns={12} sx={{ mb: 2 }}>
        {Array.from({ length: statCards }).map((_, i) => (
          <Grid key={i} size={{ xs: 12, sm: 6, lg: 3 }}>
            <Skeleton variant="rounded" height={140} sx={{ borderRadius: 3 }} />
          </Grid>
        ))}
      </Grid>

      {/* Charts */}
      {showCharts && (
        <Grid container spacing={2} columns={12} sx={{ mb: 2 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Skeleton variant="rounded" height={360} sx={{ borderRadius: 3 }} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Skeleton variant="rounded" height={360} sx={{ borderRadius: 3 }} />
          </Grid>
        </Grid>
      )}

      {/* Details heading */}
      <Skeleton variant="text" width={100} height={36} sx={{ mb: 2 }} />

      {/* Table + sidebar */}
      <Grid container spacing={2} columns={12}>
        {showTable && (
          <Grid size={{ xs: 12, lg: 9 }}>
            <Skeleton variant="rounded" height={400} sx={{ borderRadius: 3 }} />
          </Grid>
        )}
        <Grid size={{ xs: 12, lg: 3 }}>
          <Stack spacing={2}>
            <Skeleton variant="rounded" height={200} sx={{ borderRadius: 3 }} />
            <Skeleton variant="rounded" height={200} sx={{ borderRadius: 3 }} />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
