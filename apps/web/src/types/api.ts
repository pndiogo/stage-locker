export type RequestParams<
  Body = undefined,
  Headers = undefined,
  Query = undefined,
  Path = undefined,
> = (Body extends undefined ? object : { body: Body }) &
  (Headers extends undefined ? object : { headers: Headers }) &
  (Query extends undefined ? object : { query: Query }) &
  (Path extends undefined ? object : { path: Path });

export type RequestState = "idle" | "loading" | "success" | "error" | "invalid";

export type Headers = Record<string, string>;
