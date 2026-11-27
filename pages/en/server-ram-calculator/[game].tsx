import type { GetStaticPaths, GetStaticProps } from 'next';
import GameRamPage from '@/components/ram/GameRamPage';
import { GAMES, findGameBySlug, gameSlug } from '@/data/server-ram';
import { GAME_GUIDES_EN } from '@/data/server-ram.en';

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: GAMES.map((g) => ({ params: { game: gameSlug(g.id, 'en') } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<{ id: string }> = async ({ params }) => {
  const game = findGameBySlug(String(params?.game ?? ''), 'en');
  if (!game || !GAME_GUIDES_EN[game.id]) return { notFound: true };
  return { props: { id: game.id } };
};

export default function GameRamPageEn({ id }: { id: string }) {
  return <GameRamPage id={id} lang="en" />;
}
