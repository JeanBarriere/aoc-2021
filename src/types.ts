export interface RunnerResult<Input, Output> {
  input: Input
  output: Output
}

export interface Runner<Input, Output> {
  (): Promise<RunnerResult<Input, Output>>
}

export interface Transformer<Output> {
  (value: string): Promise<Output>
}

export interface Executor<Input, Output> {
  (input: Input): Promise<Output>
}
