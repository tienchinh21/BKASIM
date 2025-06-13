'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr/ArrowLeft';

interface BackButtonProps {
  label?: string;
}

const BackButton = ({ label = 'Quay lại' }: BackButtonProps) => {
  const router = useRouter();

  return (
    <Button variant="outlined" startIcon={<ArrowLeft />} onClick={() => router.back()} sx={{ mb: 2 }}>
      {label}
    </Button>
  );
};

export default BackButton;
