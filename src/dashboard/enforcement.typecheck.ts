import type {
  GetGuildEnforcementResponse,
  RestoreGuildRequest,
  SuspendGuildRequest,
} from './enforcement';

const suspension: SuspendGuildRequest = {
  publicReason: 'Terms of Service violation.',
  privateReason: 'Reviewed evidence in internal case NYX-1.',
  internalReference: 'NYX-1',
};
const restoration: RestoreGuildRequest = { reason: 'Appeal accepted.' };
const response: GetGuildEnforcementResponse = {
  guildId: '123',
  state: null,
  events: [],
};

void [suspension, restoration, response];
// @ts-expect-error privateReason is mandatory
const invalid: SuspendGuildRequest = { publicReason: 'Missing private reason' };
void invalid;
