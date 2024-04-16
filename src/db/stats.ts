import { prisma } from "./prisma";

export async function funStats(): Promise<{
  activeTeams: number;
  totalAsks: number;
  totalAnswers: number;
  biggestTeam: number;
  dashboardTeams: number;
  mostQuestions: number;
}> {
  const activeTeams = await prisma.team.count({
    where: { active: true },
  });
  const totalAsks = await prisma.asked.count({
    where: { revealed: true, skipped: false },
  });
  const totalAnswers = await prisma.answer.count({
    where: { asked: { revealed: true, skipped: false } },
  });
  const biggestTeam =
    (
      await prisma.asked.findFirst({
        orderBy: {
          answers: { _count: "desc" },
        },
        include: {
          _count: { select: { answers: true } },
        },
      })
    )?._count.answers || 0;
  const dashboardTeams = await prisma.team.count({
    where: { active: true, assosiatedGroup: { not: null } },
  });

  const mostQuestions = (
    await prisma.$queryRaw`SELECT MAX(jsonb_array_length(questions)) FROM "Team";`
  )[0]?.max;

  return {
    activeTeams,
    totalAsks,
    totalAnswers,
    biggestTeam,
    dashboardTeams,
    mostQuestions,
  };
}
