export type Await<Awaitable> = Awaitable extends Promise<infer Value> ? Value : Awaitable;
