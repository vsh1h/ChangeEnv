import { ChallengeParticipationRepository } from "../repositories/ChallengeParticipationRepository.js";
import { ChallengeRepository } from "../repositories/ChallengeRepository.js";
import { AppError } from "../utils/AppError.js";

export class ChallengeService {
  static async createChallenge(organizationId: string, title: string, targetAmount: number) {
    if (!organizationId || !title) {
      throw new AppError("Invalid challenge data", 400);
    }

    if (targetAmount <= 0) {
      throw new AppError("Invalid target amount", 400);
    }

    return ChallengeRepository.create(organizationId, title, targetAmount);
  }

  static async participate(challengeId: string, userId: string) {
    if (!challengeId || !userId) {
      throw new AppError("Invalid participation input", 400);
    }

    const challenge = await ChallengeRepository.findById(challengeId);

    if (!challenge) {
      throw new AppError("Challenge not found", 404);
    }

    const existingParticipation = await ChallengeParticipationRepository.findByChallengeAndUser(
      challengeId,
      userId
    );

    if (existingParticipation) {
      return existingParticipation;
    }

    return ChallengeParticipationRepository.create(challengeId, userId);
  }

  static async trackProgress(challengeId: string, userId: string, progressDelta: number) {
    if (!challengeId || !userId) {
      throw new AppError("Invalid progress input", 400);
    }

    if (progressDelta < 0) {
      throw new AppError("Invalid progress", 400);
    }

    const participation = await ChallengeParticipationRepository.findByChallengeAndUser(
      challengeId,
      userId
    );

    if (!participation) {
      throw new AppError("Participation not found", 404);
    }

    const challenge = await ChallengeRepository.findById(challengeId);

    if (!challenge) {
      throw new AppError("Challenge not found", 404);
    }

    const updatedProgress = participation.progress + progressDelta;

    const updatedParticipation = await ChallengeParticipationRepository.updateProgress(
      participation.id,
      updatedProgress
    );

    if (updatedProgress >= challenge.targetAmount) {
      await ChallengeRepository.updateStatus(challengeId, "COMPLETED");
    }

    return updatedParticipation;
  }
}
