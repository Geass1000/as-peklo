
export namespace Result {
  export interface Many<Data> {
    result: Data[];
  }

  export interface One<Data> {
    result: Data;
  }
}

