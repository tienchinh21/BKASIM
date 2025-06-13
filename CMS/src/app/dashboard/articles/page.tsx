'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import blogService from '@/service/apis/blogService';
import { Box, Button, CircularProgress, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { useDebouncedFilters } from '@/hooks/use-debounced-filters';
import { BlogTable } from '@/components/dashboard/acticles/blog-table';

const BlogListPage = () => {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loadingCreate, setLoadingCreate] = useState(false);

  const [filters, setFilters] = useState({
    search: '',
    status: '',
    isFeatured: '',
  });

  const debouncedFilters = useDebouncedFilters(filters);

  const { data, isLoading } = useQuery({
    queryKey: ['blogs', page, rowsPerPage, debouncedFilters],
    queryFn: () =>
      blogService.getAll({
        page: page + 1,
        pageSize: rowsPerPage,
        ...debouncedFilters,
      }),
    placeholderData: (prev) => prev,
  });

  const handleCreate = () => {
    setLoadingCreate(true);
    router.push('/dashboard/articles/create');
  };

  const handleResetFilters = () => {
    setFilters({ search: '', status: '', isFeatured: '' });
    setPage(0);
  };

  useEffect(() => {
    setPage(0);
  }, [filters]);

  return (
    <Stack spacing={2} p={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Bài viết</Typography>
        <Box position="relative" display="inline-flex">
          <Button variant="contained" disabled={loadingCreate} onClick={handleCreate}>
            Tạo bài viết
          </Button>
          {loadingCreate && (
            <CircularProgress
              size={24}
              sx={{
                color: 'primary.main',
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          )}
        </Box>
      </Stack>

      <Stack direction="row" spacing={2}>
        <TextField
          label="Tìm kiếm"
          size="small"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
        <TextField
          select
          label="Trạng thái"
          size="small"
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="active">Hoạt động</MenuItem>
          <MenuItem value="inactive">Không hoạt động</MenuItem>
        </TextField>
        <TextField
          select
          label="Nổi bật"
          size="small"
          value={filters.isFeatured}
          onChange={(e) => setFilters({ ...filters, isFeatured: e.target.value })}
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="">Tất cả</MenuItem>
          <MenuItem value="true">Nổi bật</MenuItem>
          <MenuItem value="false">Không nổi bật</MenuItem>
        </TextField>
        <Button variant="outlined" onClick={handleResetFilters}>
          Đặt lại bộ lọc
        </Button>
      </Stack>

      <BlogTable
        rows={data?.data || []}
        count={data?.total || 0}
        page={page}
        rowsPerPage={rowsPerPage}
        loading={isLoading}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />
    </Stack>
  );
};

export default BlogListPage;
