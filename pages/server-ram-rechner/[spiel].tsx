import type { GetStaticPaths, GetStaticProps } from 'next';
import GameRamPage from '@/components/ram/GameRamPage';
import { GAMES, findGame } from '@/data/server-ram';
import { GAME_GUIDES } from '@/data/game-ram-guides';

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: GAMES.map((g) => ({ params: { spiel: g.id } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<{ id: string }> = async ({ params }) => {
  const id = String(params?.spiel ?? '');
  if (!findGame(id) || !GAME_GUIDES[id]) return { notFound: true };
  return { props: { id } };
};

export default function GameRamPageDe({ id }: { id: string }) {
  return <GameRamPage id={id} lang="de" />;
}
