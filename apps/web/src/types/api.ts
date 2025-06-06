export type RequestParams<
  Body = undefined,
  Query = undefined,
  Path = undefined,
> = (Body extends undefined ? object : { body: Body }) &
  (Query extends undefined ? object : { query: Query }) &
  (Path extends undefined ? object : { path: Path });

export type RequestState = "idle" | "loading" | "success" | "error" | "invalid";
