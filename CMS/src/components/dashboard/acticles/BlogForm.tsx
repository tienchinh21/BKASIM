'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';

import axiosClient from '@/util/axiosClient';

import { ICategory } from '@/types/category';

interface BlogFormProps {
  form: any;
  setForm: (f: any) => void;
  categories: ICategory[];
  loading?: boolean;
  onSubmit: () => void;
  title?: string;
}

const BlogForm: React.FC<BlogFormProps> = ({ form, setForm, categories, loading, onSubmit, title = 'Bài viết' }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const quillRef = useRef<any>(null);

  const handleInsertImage = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('image', file);

      try {
        const res = await axiosClient.post('/upload/blog-image', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        const imageUrl = res.data.path;
        const editor = quillRef.current?.getEditor();
        const range = editor?.getSelection(true);

        if (range) {
          editor.insertEmbed(range.index, 'image', imageUrl);
          editor.setSelection((range.index as number) + 1);
        }
      } catch (err) {
        console.error('Lỗi upload ảnh nội dung:', err);
      }
    };
  };

  useEffect(() => {
    if (!form?.image) return;

    if (form.image instanceof File) {
      const objectUrl = URL.createObjectURL(form.image);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }

    if (typeof form.image === 'string') {
      setPreview(form.image);
    }
  }, [form?.image]);

  if (!form || loading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <CircularProgress />
      </Box>
    );

  return (
    <Box component="form" onSubmit={(e) => e.preventDefault()}>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <TextField
            label="Tiêu đề"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={form.title || ''}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <TextField
            label="Tóm tắt"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={form.summary || ''}
            onChange={(e) => setForm({ ...form, summary: e.target.value })}
          />

          <Box mt={2}>
            <Typography variant="subtitle1">Ảnh đại diện</Typography>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setForm({ ...form, image: file });
                  const url = URL.createObjectURL(file);
                  setPreview(url);
                }
              }}
            />
            {preview && (
              <Box mt={1}>
                <img src={preview} alt="preview" width={120} style={{ borderRadius: 4, objectFit: 'cover' }} />
              </Box>
            )}
          </Box>

          <Select
            fullWidth
            value={form.categoryId || ''}
            onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
            sx={{ mt: 2 }}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Chọn danh mục
            </MenuItem>
            {categories.map((cat: ICategory) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>

          <Select
            fullWidth
            value={form.status || ''}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            sx={{ mt: 2 }}
          >
            <MenuItem value="active">Hoạt động</MenuItem>
            <MenuItem value="inactive">Ngưng hoạt động</MenuItem>
          </Select>

          <FormControlLabel
            sx={{ mt: 2 }}
            control={
              <Switch
                checked={form.isFeatured || false}
                onChange={(e) => {
                  setForm({ ...form, isFeatured: e.target.checked });
                }}
              />
            }
            label="Bài viết nổi bật"
          />

          <Box mt={4}>
            <Button variant="contained" type="button" onClick={onSubmit} disabled={loading}>
              {loading ? 'Đang lưu...' : 'Lưu'}
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={7}>
          <Box sx={{ border: '1px solid #ccc', borderRadius: 2, overflow: 'hidden' }}>
            <ReactQuill
              ref={quillRef}
              value={form.content || ''}
              onChange={(value) => setForm({ ...form, content: value })}
              modules={{
                toolbar: [
                  [{ header: [1, 2, 3, false] }],
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  ['link', 'image'],
                  ['clean'],
                ],
              }}
            />
          </Box>

          <Box mt={2}>
            <Button variant="outlined" onClick={handleInsertImage}>
              Chèn ảnh vào nội dung
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BlogForm;
