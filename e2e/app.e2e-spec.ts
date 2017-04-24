import { Angularattack2017NgxSemanticUiPage } from './app.po';

describe('angularattack2017-ngx-semantic-ui App', () => {
  let page: Angularattack2017NgxSemanticUiPage;

  beforeEach(() => {
    page = new Angularattack2017NgxSemanticUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
