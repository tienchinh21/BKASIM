'use client';

import Link from 'next/link';
import {
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';

import { IBlog } from '@/types/blog';

interface BlogTableProps {
  rows: IBlog[];
  count: number;
  page: number;
  rowsPerPage: number;
  loading: boolean;
  onPageChange: (e: unknown, newPage: number) => void;
  onRowsPerPageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function BlogTable({
  rows,
  count,
  page,
  rowsPerPage,
  loading,
  onPageChange,
  onRowsPerPageChange,
}: BlogTableProps) {
  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tiêu đề</TableCell>
              <TableCell>Danh mục</TableCell>
              <TableCell>Ngày tạo</TableCell>
              <TableCell>Hình ảnh</TableCell>
              <TableCell>Nổi bật</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell align="right">Chỉnh sửa</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <Box display="flex" justifyContent="center" minHeight="200px">
                    <CircularProgress />
                  </Box>
                </TableCell>
              </TableRow>
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6}>Không có dữ liệu</TableCell>
              </TableRow>
            ) : (
              rows.map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell>{blog.title}</TableCell>
                  <TableCell>{blog.category?.name}</TableCell>
                  <TableCell>{dayjs(blog.createdAt).format('DD/MM/YYYY')}</TableCell>
                  <TableCell>
                    <img
                      src={blog.image}
                      alt={blog.title}
                      width={100}
                      height={100}
                      style={{ objectFit: 'cover', borderRadius: 4 }}
                    />
                  </TableCell>
                  <TableCell>
                    {blog.isFeatured ? (
                      <Chip label="Nổi bật" color="warning" size="small" />
                    ) : (
                      <Chip label="Thường" variant="outlined" size="small" />
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={blog.status === 'active' ? 'Hoạt động' : 'Ngưng'}
                      color={blog.status === 'active' ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Button variant="contained" component={Link} href={`/dashboard/articles/${blog.id}`}>
                      Sửa
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={count}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 20]}
      />
    </Card>
  );
}
