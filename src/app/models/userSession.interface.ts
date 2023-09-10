export interface UserSession {
  sessionId: string,
  sessionNumber: number;
  sessionTitle: string;
  isDone: boolean;
  isNext: boolean;
}

export const defaultUserSession: UserSession = {
    sessionId: 'null',
    sessionNumber: 0,
    sessionTitle: 'null',
    isDone: false,
    isNext: false,
}