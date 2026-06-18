import { INSIGHTS } from '@/lib/constants';
import InsightDetailContent from '@/components/detail/InsightDetailContent';

export default async function InsightDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <InsightDetailContent slug={slug} />;
}

export function generateStaticParams() {
  return INSIGHTS.map(item => ({ slug: item.slug }));
}
