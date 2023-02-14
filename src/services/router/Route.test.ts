import { expect } from 'chai';
import { Route } from './route';

class View {
  show() {}

  hide() {}
}

describe('Route', () => {
  let route: Route;

  beforeEach(() => {
    route = new Route('/pathname', View, { rootQuery: '#app' });
  });

  it('should match a pathname correctly', () => {
    expect(route.match('/pathname')).to.be.true;
    expect(route.match('/otherpath')).to.be.false;
  });

  it('should instantiate the block only once', () => {
    route.render();
    expect(route._block).to.not.be.null;

    route.render();
    expect(route._block).to.not.be.null;
  });

  it('should change the pathname and render the block', () => {
    route.navigate('/newpathname');
    expect(route._pathname).to.equal('/newpathname');
    expect(route._block).to.not.be.null;
  });

  it('should leave the block', () => {
    route.render();
    expect(route._block).to.not.be.null;

    route.leave();
    expect(route._block).to.be.null;
  });
});
