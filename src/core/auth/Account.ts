import { Any } from '@initia/initia.proto/google/protobuf/any';
import { BaseAccount } from './BaseAccount';
import { BaseVestingAccount } from './BaseVestingAccount';
import { ContinuousVestingAccount } from './ContinuousVestingAccount';
import { DelayedVestingAccount } from './DelayedVestingAccount';
import { PeriodicVestingAccount } from './PeriodicVestingAccount';

export type Account =
  | BaseAccount
  | BaseVestingAccount
  | ContinuousVestingAccount
  | DelayedVestingAccount
  | PeriodicVestingAccount;

/**
 * Stores information about an account fetched from the blockchain.
 */
export namespace Account {
  export type Amino =
    | BaseAccount.Amino
    | BaseVestingAccount.Amino
    | ContinuousVestingAccount.Amino
    | DelayedVestingAccount.Amino
    | PeriodicVestingAccount.Amino;
  export type Data =
    | BaseAccount.Data
    | BaseVestingAccount.Data
    | ContinuousVestingAccount.Data
    | DelayedVestingAccount.Data
    | PeriodicVestingAccount.Data;
  export type Proto = Any;

  export function fromAmino(amino: Account.Amino): Account {
    switch (amino.type) {
      case 'cosmos-sdk/BaseAccount':
        return BaseAccount.fromAmino(amino);
      case 'cosmos-sdk/BaseVestingAccount':
        return BaseVestingAccount.fromAmino(amino);
      case 'cosmos-sdk/ContinuousVestingAccount':
        return ContinuousVestingAccount.fromAmino(amino);
      case 'cosmos-sdk/DelayedVestingAccount':
        return DelayedVestingAccount.fromAmino(amino);
      case 'cosmos-sdk/PeriodicVestingAccount':
        return PeriodicVestingAccount.fromAmino(amino);
    }
  }

  export function fromData(data: Account.Data): Account {
    switch (data['@type']) {
      case '/cosmos.auth.v1beta1.BaseAccount':
        return BaseAccount.fromData(data);
      case '/cosmos.vesting.v1beta1.BaseVestingAccount':
        return BaseVestingAccount.fromData(data);
      case '/cosmos.vesting.v1beta1.ContinuousVestingAccount':
        return ContinuousVestingAccount.fromData(data);
      case '/cosmos.vesting.v1beta1.DelayedVestingAccount':
        return DelayedVestingAccount.fromData(data);
      case '/cosmos.vesting.v1beta1.PeriodicVestingAccount':
        return PeriodicVestingAccount.fromData(data);
    }
  }

  export function fromProto(accountAny: Account.Proto): Account {
    const typeUrl = accountAny.typeUrl;
    if (typeUrl === '/cosmos.auth.v1beta1.BaseAccount') {
      return BaseAccount.unpackAny(accountAny);
    } else if (typeUrl === '/cosmos.vesting.v1beta1.ContinuousVestingAccount') {
      return ContinuousVestingAccount.unpackAny(accountAny);
    } else if (typeUrl === '/cosmos.vesting.v1beta1.DelayedVestingAccount') {
      return DelayedVestingAccount.unpackAny(accountAny);
    } else if (typeUrl === '/cosmos.vesting.v1beta1.PeriodicVestingAccount') {
      return PeriodicVestingAccount.unpackAny(accountAny);
    }

    throw new Error(`Account type ${typeUrl} not recognized`);
  }
}