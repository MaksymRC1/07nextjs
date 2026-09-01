import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '../../../../lib/api';
import NotesClient from './Notes.client';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function NotesPage({ params }: PageProps) {
  const { slug } = await params;
  const tagParam = slug?.[0] || 'all';
  const tag = tagParam === 'all' ? undefined : tagParam;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, search: '', tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tagParam} />
    </HydrationBoundary>
  );
}
