import { StargateClient, QueryClient } from "@cosmjs/stargate";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { ISCNExtension, setupISCNExtension } from "./ISCNQueryExtension";
import config from "~/constant/network";
import { parseISCNTxInfoFromIndexedTx, parseISCNTxRecordFromQuery } from '.';

let stargateClient: StargateClient;
let queryClient: QueryClient & ISCNExtension;

async function initQueryClient() {
  const tendermintClient = await Tendermint34Client.connect(config.rpcURL);
  queryClient = QueryClient.withExtensions(
    tendermintClient,
    setupISCNExtension,
  );
}

export async function queryRecordsByTx(txId: string) {
  if (!stargateClient) stargateClient = await StargateClient.connect(config.rpcURL);
  const res = await stargateClient.getTx(txId);
  if (res) return parseISCNTxInfoFromIndexedTx(res);
  return null;
}

export async function queryRecordsById(iscnId: string, fromVersion?: number, toVersion?: number) {
  if (!queryClient) await initQueryClient();
  const res = await queryClient.iscn.recordsById(iscnId, fromVersion, toVersion);
  if (res && res.records) {
    const records = parseISCNTxRecordFromQuery(res.records);
    return {
      ...res,
      records,
    };
  }
  return null;
}

export async function queryRecordsByFingerprint(fingerprint: string, fromSequence?: number) {
  if (!queryClient) await initQueryClient();
  const res = await queryClient.iscn.recordsByFingerprint(fingerprint, fromSequence);
  if (res && res.records) {
    const records = parseISCNTxRecordFromQuery(res.records);
    return {
      ...res,
      records,
    };
  }
  return null;
}

export async function queryRecordsByOwner(owner: string, fromSequence?: number) {
  if (!queryClient) await initQueryClient();
  const res = await queryClient.iscn.recordsByOwner(owner, fromSequence);
  if (res && res.records) {
    const records = parseISCNTxRecordFromQuery(res.records);
    return {
      ...res,
      records,
    };
  }
  return null;
}