
export interface GraphQLContext {
  user: {
    id: string;
    role: string;
  } | null;
}
