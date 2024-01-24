import { DomSanitizer } from '@angular/platform-browser';
import { SafePipe } from './safe.pipe';

describe('SafePipe', () => {

  let pipe: SafePipe;
  let sanitizerMock: jasmine.SpyObj<DomSanitizer>;

  beforeEach(() => {
    sanitizerMock = jasmine.createSpyObj('DomSanitizer', 
      [
        'bypassSecurityTrustHtml', 
        'bypassSecurityTrustStyle', 
        'bypassSecurityTrustScript', 
        'bypassSecurityTrustUrl', 
        'bypassSecurityTrustResourceUrl'
      ]);
    pipe = new SafePipe(sanitizerMock);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should call bypassSecurityTrustHtml when type is html', () => {
    const value = 'some html';
    const type = 'html';
    
    pipe.transform(value, type);

    expect(sanitizerMock.bypassSecurityTrustHtml).toHaveBeenCalledWith(value);
  });

  it('should call bypassSecurityTrustStyle when type is style', () => {
    const value = 'some style';
    const type = 'style';
    
    pipe.transform(value, type);

    expect(sanitizerMock.bypassSecurityTrustStyle).toHaveBeenCalledWith(value);
  });

  it('should call bypassSecurityTrustScript when type is script', () => {
    const value = 'some script';
    const type = 'script';
    
    pipe.transform(value, type);

    expect(sanitizerMock.bypassSecurityTrustScript).toHaveBeenCalledWith(value);
  });

  it('should call bypassSecurityTrustUrl when type is url', () => {
    const value = 'some url';
    const type = 'url';
    
    pipe.transform(value, type);

    expect(sanitizerMock.bypassSecurityTrustUrl).toHaveBeenCalledWith(value);
  });

  it('should call bypassSecurityTrustResourceUrl when type is resourceUrl', () => {
    const value = 'some resourceUrl';
    const type = 'resourceUrl';
    
    pipe.transform(value, type);

    expect(sanitizerMock.bypassSecurityTrustResourceUrl).toHaveBeenCalledWith(value);
  });

  it('should throw an error for an invalid type', () => {
    const value = 'some value';
    const type = 'invalidType';

    expect(() => pipe.transform(value, type)).toThrowError('Invalid safe type specified: invalidType');
  });

});
