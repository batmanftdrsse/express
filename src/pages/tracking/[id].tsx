import { useRouter } from 'next/router';

export default function TrackingPage() {
  const router = useRouter();
  const { id } = router.query;
  
  // ... resto do código da página de rastreamento
} 