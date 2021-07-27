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

  function prepare(query: string, typeNames?: string[]);

  function return_next();

  function subtransaction();

  function find_function(): Function;

  function get_window_object();

  function quote_literal(literal: string): string;

  function quote_nullable(literal: null): null;
  function quote_nullable(literal: string): string;
  function quote_nullable(literal: string | null): string | null;

  function quote_ident(ident: string): string;

  function memory_usage();

  function rollback();

  function commit();
}

