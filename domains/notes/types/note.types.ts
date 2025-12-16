export type PublicNote = {
  id: number;
  name: string;
  text: string;
  pinned?: boolean;
  createdAt: Date;
  updatedAt: Date;
};
