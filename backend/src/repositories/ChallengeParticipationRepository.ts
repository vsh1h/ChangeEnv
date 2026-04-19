import { getDbClient } from "./dbClient.js";

export class ChallengeParticipationRepository {
  static async findByChallengeAndUser(challengeId: string, userId: string) {
    return getDbClient().challengeParticipation.findFirst({
      where: {
        challengeId,
        userId,
      },
    });
  }

  static async create(challengeId: string, userId: string) {
    return getDbClient().challengeParticipation.create({
      data: {
        challengeId,
        userId,
        progress: 0,
      },
    });
  }

  static async updateProgress(id: string, progress: number) {
    return getDbClient().challengeParticipation.update({
      where: { id },
      data: { progress },
    });
  }
}
