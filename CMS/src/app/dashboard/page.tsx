'use client';

import * as React from 'react';
import dashboardService from '@/service/apis/dashboardService';
import { Box, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useQuery } from '@tanstack/react-query';

import { ChartStats } from '@/components/dashboard/overview/chart-stats';
import { CompareBookings } from '@/components/dashboard/overview/compare-bookings';
import { CompareUsers } from '@/components/dashboard/overview/compare-users';
import { LatestBookings } from '@/components/dashboard/overview/latest-bookings';
import { LatestUsers } from '@/components/dashboard/overview/latest-users';

export default function Page(): React.JSX.Element {
  const { data: chartData, isLoading: isChartLoading } = useQuery({
    queryKey: ['dashboard-chart-data'],
    queryFn: () => dashboardService.getChartData(),
  });

  const { data: latestUsers, isLoading: isUsersLoading } = useQuery({
    queryKey: ['latest-users'],
    queryFn: () => dashboardService.getLatestUsers(),
  });

  const { data: latestBookings, isLoading: isBookingsLoading } = useQuery({
    queryKey: ['latest-bookings'],
    queryFn: () => dashboardService.getLatestBookings(),
  });

  const { data: userGrowthCompare, isLoading: isUserGrowthCompareLoading } = useQuery({
    queryKey: ['user-growth-compare'],
    queryFn: () => dashboardService.getUserGrowthCompare(),
  });

  const { data: bookingGrowthCompare, isLoading: isBookingGrowthCompareLoading } = useQuery({
    queryKey: ['booking-growth-compare'],
    queryFn: () => dashboardService.getBookingGrowthCompare(),
  });

  if (
    isChartLoading ||
    isUsersLoading ||
    isBookingsLoading ||
    isUserGrowthCompareLoading ||
    isBookingGrowthCompareLoading
  )
    return (
      <Box p={4} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );

  return (
    <Grid container spacing={3}>
      <Grid lg={3} sm={6} xs={12}>
        <CompareUsers
          currentMonth={userGrowthCompare?.data?.currentMonth}
          previousMonth={userGrowthCompare?.data?.previousMonth}
          value={userGrowthCompare?.data?.growthRate.value}
          trend={userGrowthCompare?.data?.growthRate.trend}
          sx={{ height: '100%' }}
        />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <CompareBookings
          currentMonth={bookingGrowthCompare?.data?.currentMonth}
          previousMonth={bookingGrowthCompare?.data?.previousMonth}
          value={bookingGrowthCompare?.data?.growthRate.value}
          trend={bookingGrowthCompare?.data?.growthRate.trend}
          sx={{ height: '100%' }}
        />
      </Grid>
      {/* <Grid lg={3} sm={6} xs={12}>
        <TasksProgress sx={{ height: '100%' }} value={75.5} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalProfit sx={{ height: '100%' }} value="$15k" />
      </Grid> */}
      <Grid lg={12} xs={12}>
        <ChartStats
          bookings={chartData?.data?.data.bookingsPerMonth || []}
          users={chartData?.data?.data.usersPerMonth || []}
          sx={{ height: '100%' }}
        />
      </Grid>
      <Grid lg={4} md={6} xs={12}>
        <LatestUsers users={latestUsers?.data || []} sx={{ height: '100%' }} />
      </Grid>
      <Grid lg={8} md={12} xs={12}>
        <LatestBookings bookings={latestBookings?.data || []} sx={{ height: '100%' }} />
      </Grid>
    </Grid>
  );
}
