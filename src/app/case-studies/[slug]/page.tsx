import { CASE_STUDIES } from '@/lib/constants';
import CaseStudyDetailContent from '@/components/detail/CaseStudyDetailContent';

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <CaseStudyDetailContent slug={slug} />;
}

export function generateStaticParams() {
  return CASE_STUDIES.map(cs => ({ slug: cs.slug }));
}
