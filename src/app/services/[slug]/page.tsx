import { SERVICES } from '@/lib/constants';
import ServiceDetailContent from '@/components/detail/ServiceDetailContent';

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ServiceDetailContent slug={slug} />;
}

export function generateStaticParams() {
  return SERVICES.map(s => ({ slug: s.slug }));
}
