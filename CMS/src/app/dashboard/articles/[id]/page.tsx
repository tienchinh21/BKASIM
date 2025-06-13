'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useParams, useRouter } from 'next/navigation';
import blogService from '@/service/apis/blogService';
import categoryService from '@/service/apis/categoryService';
import { Box, CircularProgress } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { showToast } from '@/contexts/ToastProvider/ToastProvider';
import BackButton from '@/components/BackButton';

const BlogForm = dynamic(() => import('@/components/dashboard/acticles/BlogForm'), { ssr: false });

const BlogEditPage = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: blog, isLoading } = useQuery({
    queryKey: ['blog', id],
    queryFn: () => blogService.getById(id as string),
  });

  const { data: categories = { data: [] } } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.getAll(),
  });

  const [form, setForm] = useState<any | null>(null);

  useEffect(() => {
    if (blog && !form) {
      setForm({
        title: blog.title,
        summary: blog.summary,
        content: blog.content,
        image: blog.image,
        categoryId: blog.category?.id || '',
        status: blog.status || 'active',
        isFeatured: blog.isFeatured || false,
      });
    }
  }, [blog]);

  const { mutate: mUpdateBlog, isPending: isUpdating } = useMutation({
    mutationFn: (data: any) => blogService.updateBlog(id as string, data),
    onSuccess: () => {
      showToast.success('Cập nhật bài viết thành công');
      queryClient.invalidateQueries({ queryKey: ['blog', id] });
      router.push('/dashboard/articles');
    },
    onError: () => {
      showToast.error('Cập nhật bài viết thất bại');
    },
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <BackButton />
      <BlogForm
        title="Chỉnh sửa bài viết"
        form={form}
        setForm={setForm}
        categories={categories.data}
        onSubmit={() => mUpdateBlog(form)}
        loading={isUpdating}
      />
    </>
  );
};

export default BlogEditPage;
