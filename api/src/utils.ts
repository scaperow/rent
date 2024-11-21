import { random } from 'lodash';
import * as moment from 'moment';

export enum NumberName {
  CONTRACT_ORDER = 'CO',
  TRANSACTION_ORDER = 'TO',
}
//TODO refactor
export const getNumber = (slug: NumberName) => {
  const now = moment();

  return `${slug}-${now.format('YYYYMMDD')}-${String(random(0, 4)).padStart(
    4,
    '0',
  )}`;
};
