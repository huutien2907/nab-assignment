import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('testing base layout', () => {
  it('should be run', () => {
    expect(1).toBe(1);
  });
});
