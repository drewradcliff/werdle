export interface Match {
  key: string;
  exists: boolean;
  match: boolean;
}

export interface AuthData {
  emailAddress: string;
  password: string;
}

export interface Guess {
  wordGuessed: string;
  matches: Match[];
}

export interface KeyboardRow {
  keys: string[];
}

export interface MWResponse {
  meta: { id: string } | string | null;
}
