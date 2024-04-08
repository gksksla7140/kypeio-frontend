export interface CreateGameResponse {
  errors?: string;
  gameId?: string;
  message?: string;
  hostId?: string;
}
export interface JoinGameResponse {
  errors?: string;
  message?: string;
  gameId?: string;
  playerId?: string;
}


export interface CreateApiResponse {
  errors?: string;
  data?: {
    gameId: string;
    hostId: string;
  };
}

export interface joinApiResponse {
  errors?: string;
  data?: {
    gameId: string;
    playerId: string;
  };
}