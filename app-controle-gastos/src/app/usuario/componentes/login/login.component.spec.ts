import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';
import { AuthService } from '../../../services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: jest.Mocked<AuthService>;
  let routerMock: jest.Mocked<Router>;

  beforeEach(async () => {
    authServiceMock = {
      login: jest.fn()
    } as any;

    routerMock = {
      navigate: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        // provideZonelessChangeDetection(),
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Analogia

  // 1. configureTestingModule: Prepara o cenário e os atores (configuração)
  // 2. createComponent: Coloca os atores no palco (criação)
  // 3. componentInstance: Dá o roteiro para os atores (acesso)
  // 4. detectChanges: Grita "Ação!" para começar a peça (inicialização)

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar o formulário vazio', () => {
    expect(component.loginForm.get('email')?.value).toBe('');
    expect(component.loginForm.get('senha')?.value).toBe('');
  });

  it('deve validar email obrigatório', () => {
    const emailControl = component.loginForm.get('email');
    expect(emailControl?.hasError('required')).toBeTruthy();
  });

  it('deve validar formato de email', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.setValue('email-invalido');
    expect(emailControl?.hasError('email')).toBeTruthy();
  });

  it('deve chamar o serviço de login', () => {
    authServiceMock.login.mockReturnValue(of({ id: 1, email: 'teste@email.com' }));
    
    component.loginForm.setValue({
      email: 'teste@email.com',
      senha: 'senha123'
    });
    
    component.onSubmit();
    
    expect(authServiceMock.login).toHaveBeenCalled();
  });

  it('deve redirecionar após login bem-sucedido', (done) => {
    authServiceMock.login.mockReturnValue(of({ id: 1, email: 'teste@email.com' }));
    
    component.loginForm.setValue({
      email: 'teste@email.com',
      senha: 'senha123'
    });
    
    component.onSubmit();
    
    setTimeout(() => {
      expect(routerMock.navigate).toHaveBeenCalledWith(['/dashboard']);
      done();
    });
  });

  it('deve exibir erro quando login falhar', (done) => {
    authServiceMock.login.mockReturnValue(throwError(() => new Error('Erro')));
    
    component.loginForm.setValue({
      email: 'teste@email.com',
      senha: 'senhaErrada'
    });
    
    component.onSubmit();
    
    setTimeout(() => {
      expect(component.erro).toBe('E-mail ou senha inválidos');
      done();
    });
  });
});