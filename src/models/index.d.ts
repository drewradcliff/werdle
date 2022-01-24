import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type HistoryMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class History {
  readonly id: string;
  readonly completedAt: number;
  readonly guesses: number;
  readonly word: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<History, HistoryMetaData>);
  static copyOf(source: History, mutator: (draft: MutableModel<History, HistoryMetaData>) => MutableModel<History, HistoryMetaData> | void): History;
}