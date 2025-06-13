'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import blogService from '@/service/apis/blogService';
import categoryService from '@/service/apis/categoryService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { showToast } from '@/contexts/ToastProvider/ToastProvider';
import BackButton from '@/components/BackButton';

const BlogForm = dynamic(() => import('@/components/dashboard/acticles/BlogForm'), { ssr: false });

const BlogCreatePage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    title: '',
    summary: '',
    content: '',
    image: '',
    categoryId: '',
    isFeatured: false,
    status: 'active',
  });

  const { data: categories = { data: [] } } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.getAll(),
  });

  const { mutate: mCreateBlog, isPending: isCreating } = useMutation({
    mutationFn: (data: any) => blogService.createBlog(data),
    onSuccess: () => {
      showToast.success('Tạo bài viết thành công');
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      router.push('/dashboard/articles');
    },
    onError: () => {
      showToast.error('Tạo bài viết thất bại');
    },
  });

  return (
    <>
      <BackButton />
      <BlogForm
        title="Tạo bài viết mới"
        form={form}
        setForm={setForm}
        categories={categories.data}
        onSubmit={() => mCreateBlog(form)}
        loading={isCreating}
      />
    </>
  );
};

export default BlogCreatePage;
