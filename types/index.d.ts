declare namespace plv8 {
  interface Plv8Version {
    "version": string;
    "v8_version": string;
  }


  interface MemoryUsage {
    "total_heap_size": number;
    "used_heap_size": number;
    "external_memory": number;
  }

  interface Cursor {

  }

  interface WindowObject<T = unknown> {
    get_current_position(): number;
    get_partition_row_count(): number;
    rows_are_peers(pos1: unknown, pos2: unknown): boolean;
    get_func_arg_in_partition(argno: unknown, relpos: unknown, seektype: unknown, mark_pos: unknown): unknown;
    get_func_arg_in_frame(argno: unknown, relpos: unknown, seektype: unknown, mark_pos: unknown): unknown;
    get_func_arg_in_current(argno: unknown, relpos: unknown, seektype: unknown, mark_pos: unknown): unknown;
    get_partition_local(size?: number): undefined | T;
    set_partition_local(v: T): unknown;
  }

  interface PreparedPlan {
    execute(args?: any[]);
    cursor(args?: any[]): Cursor;
    free(): unknown;
  }

  const DEBUG5 = 10;
  const DEBUG4 = 11;
  const DEBUG3 = 12;
  const DEBUG2 = 13;
  const DEBUG1 = 14;
  const DEBUG = 10;
  const LOG = 15;
  const INFO = 17;
  const NOTICE = 18;
  const WARNING = 19;
  const ERROR = 20;
  const plv8: Plv8Version;

  function elog();

  function execute(sql: string, args?: any[]) : any[] | number;

  function prepare(query: string, typeNames?: string[]): PreparedPlan;

  function return_next();

  function subtransaction();

  function find_function(): Function;

  function get_window_object<T>(): WindowObject<T>;

  function quote_literal(literal: string): string;

  function quote_nullable(literal: null): null;
  function quote_nullable(literal: string): string;
  function quote_nullable(literal: string | null): string | null;

  function quote_ident(ident: string): string;

  function memory_usage(): MemoryUsage;

  function rollback();

  function commit();
}

