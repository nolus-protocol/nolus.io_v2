import type { Proposal } from "@/components/vote/Proposal";

/**
 * Response from the staking pool API endpoint
 */
export interface StakingPoolResponse {
  pool: {
    bonded_tokens: string;
    not_bonded_tokens?: string;
  };
}

/**
 * Response from the governance proposals API endpoint
 */
export interface GovernanceResponse {
  proposals: Proposal[];
  pagination: {
    next_key: string | null;
    total: string;
  };
}

/**
 * Response from the governance tallying parameters endpoint
 */
export interface TallyingParamsResponse {
  tally_params?: {
    quorum: string;
    threshold: string;
    veto_threshold: string;
  };
  params?: {
    quorum: string;
    threshold: string;
    veto_threshold: string;
  };
}
