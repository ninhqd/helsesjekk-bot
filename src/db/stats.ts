import { prisma } from "./prisma";

export async function funStats(): Promise<{
  activeTeams: number;
  totalAsks: number;
  totalAnswers: number;
  biggestTeam: number;
  dashboardTeams: number;
  mostQuestions: number;
}> {
  const [
    activeTeams,
    totalAsks,
    totalAnswers,
    biggestTeam,
    dashboardTeams,
    mostQuestions,
  ] = await Promise.all([
    await prisma.team.count({
      where: { active: true },
    }),
    await prisma.asked.count({
      where: { revealed: true, skipped: false },
    }),
    await prisma.answer.count({
      where: { asked: { revealed: true, skipped: false } },
    }),
    (
      await prisma.asked.findFirst({
        orderBy: {
          answers: { _count: "desc" },
        },
        include: {
          _count: { select: { answers: true } },
        },
      })
    )._count.answers,
    await prisma.team.count({
      where: { active: true, assosiatedGroup: { not: null } },
    }),
    (
      await prisma.$queryRaw`SELECT MAX(jsonb_array_length(questions)) FROM "Team";`
    )[0]?.max,
  ]);
  console.debug(activeTeams);
  console.debug(totalAsks);
  console.debug(totalAnswers);
  console.debug(biggestTeam);
  console.debug(dashboardTeams);
  console.debug(mostQuestions);

  return {
    activeTeams: activeTeams || 0,
    totalAsks: totalAsks || 0,
    totalAnswers: totalAnswers || 0,
    biggestTeam: biggestTeam || 0,
    dashboardTeams: dashboardTeams || 0,
    mostQuestions: mostQuestions || 0,
  };
}
