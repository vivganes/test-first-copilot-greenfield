// GH Copilot code - starts
import { REGISTRATION_API } from './ApiEndpoints';

describe('ApiEndpoints', () => {
  it('exports correct registration endpoint', () => {
    expect(REGISTRATION_API).toMatch(/\/register$/);
  });
});
// GH Copilot code - end
