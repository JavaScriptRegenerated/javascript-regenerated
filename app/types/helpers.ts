export type Await<Awaitable> = Awaitable extends Promise<infer Value> ? Value : Awaitable;

export type FinalResult<Type> = Type extends Generator<any, infer Result> ? Result : Type;
