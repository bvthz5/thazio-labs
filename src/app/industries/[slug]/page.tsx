import { INDUSTRIES } from '@/lib/constants';
import IndustryDetailContent from '@/components/detail/IndustryDetailContent';

export default async function IndustryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <IndustryDetailContent slug={slug} />;
}

export function generateStaticParams() {
  return INDUSTRIES.map(ind => ({ slug: ind.slug }));
}
