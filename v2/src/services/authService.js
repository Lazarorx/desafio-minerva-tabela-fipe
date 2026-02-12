// Service para autenticação fake (LocalStorage)
import storageService from './storageService';

const USERS_KEY = 'fipecheck_users';

class AuthService {
  // Registrar novo usuário
  register(name, email, password) {
    const users = this.getAllUsers();
    
    // Verifica se email já existe
    if (users.find(u => u.email === email)) {
      throw new Error('Email já cadastrado');
    }
    
    const newUser = {
      id: Date.now(),
      name,
      email,
      password, // Em produção, seria hash!
      createdAt: new Date().toISOString(),
    };
    
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    // Faz login automático
    const userWithoutPassword = { ...newUser };
    delete userWithoutPassword.password;
    storageService.saveUser(userWithoutPassword);
    
    return userWithoutPassword;
  }

  // Login
  login(email, password) {
    const users = this.getAllUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Email ou senha incorretos');
    }
    
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;
    storageService.saveUser(userWithoutPassword);
    
    return userWithoutPassword;
  }

  // Logout
  logout() {
    storageService.removeUser();
  }

  // Verifica se está logado
  isAuthenticated() {
    return storageService.getUser() !== null;
  }

  // Pega usuário atual
  getCurrentUser() {
    return storageService.getUser();
  }

  // Pega todos os usuários (privado)
  getAllUsers() {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  }
}

export default new AuthService();
