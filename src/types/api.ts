/**
 * ETL API response types
 */

export interface TotalTxValueResponse {
  total_tx_value: string;
}

export interface TotalValueLockedResponse {
  total_value_locked: string;
}

export interface PoolData {
  protocol: string;
  utilization: string;
  supplied: string;
  borrowed: string;
  borrow_apr: string;
  earn_apr: string;
}

export interface PoolsResponse {
  protocols: PoolData[];
  optimal: string;
  deposit_suspension: string;
}

/**
 * RSS/Blog API response types
 */

export interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  author: string;
  image: string | null;
}
