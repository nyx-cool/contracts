import {
  CONTROL_PLANE_ROUTES,
  type GetDashboardActorCapabilitiesResponse,
} from '../index';

const route: '/api/control/dashboard/actor-capabilities' =
  CONTROL_PLANE_ROUTES.dashboardActorCapabilities;
const operator: GetDashboardActorCapabilitiesResponse = { isOperator: true };
const ordinary: GetDashboardActorCapabilitiesResponse = { isOperator: false };

// @ts-expect-error isOperator must be boolean
const invalid: GetDashboardActorCapabilitiesResponse = { isOperator: 'true' };
void [route, operator, ordinary, invalid];
