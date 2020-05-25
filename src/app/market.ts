export class Market {
  security_id?: number;
  create_time?: string;
  end_time: string;
  market_descriptor: string;
  market_name: string;
  last_traded?: number;
  best_bid?: number;
  best_bid_volume?: number;
  best_ask?: number;
  best_ask_volume?: number;
  in_settle?: number;
}