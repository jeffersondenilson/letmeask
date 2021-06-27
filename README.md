<div id="top"></div>

<h1>
  LetMeAsk <img src="src/assets/images/logo-white.svg" alt="LetMeAsk logo" />
</h1>

<a href="#about">Sobre</a> | 
<a href="#features">Funcionalidades</a> | 
<a href="#techs">Tecnologias</a> | 
<a href="#requirements">Requisitos</a> | 
<a href="#install">Instalação</a> | 
<a href="#deploy">Deploy</a> | 
<a href="#author">Autor</a>

<h2 id="about">Sobre</h2>

<p>
  Projeto da NLW#6 na trilha de React. Uma aplicação de Q&A que permite 
  usuários fazerem perguntas e selecionarem quais mais querem que sejam 
  respondidas.
  <br>
  <br>
  <a href="https://letmeask-web-d72c1.web.app" target="_blank">
    Demo
  </a>
</p>

<h2 id="features">Funcionalidades</h2>

<ul>
  <li>Autenticação com Google</li>
  <li>Perguntas atualizadas em tempo real</li>
  <li>Marcar perguntas como "gostei"</li>
  <li>Tela de admin para responder, destacar e excluir perguntas</li>
  <li>Criação de sala que pode ser acessada por meio de um código</li>
  <li>Tema escuro</li>
</ul>

<h2 id="techs">Tecnologias</h2>

<ul>
  <li>
    <a href="https://firebase.google.com" target="_blank">
      Firebase
    </a> - Autenticação com Google e Realtime Database
  </li>
  <li>
    <a href="https://reactjs.org" target="_blank">
      React
    </a> - Aplicação front-end
  </li>
  <li>
    <a href="https://reactrouter.com" target="_blank">
      React Router
    </a> - Navegação do lado cliente
  </li>
  <li>
    <a href="https://www.typescriptlang.org" target="_blank">
      Typescript
    </a> - Tipagem estática
  </li>
  <li>
    <a href="https://sass-lang.com" target="_blank">
      Sass
    </a> - Pré-processador CSS
  </li>
</ul>

<h2 id="requirements">Requisitos</h2>

<ul>
  <li>
    <a href="https://nodejs.org" target="_blank">
      Nodejs
    </a> 14.x
  </li>
</ul>

<h2 id="install">Instalação</h2>

```bash
git clone https://github.com/jeffersondenilson/letmeask.git

cd letmeask

npm install

npm start
```

Crie o arquivo `.env.local`, seguindo o [.env.example](.env.example), com as informações de configuração do Firebase (Ver <a href="https://firebase.google.com/docs/web/setup" target="_blank">Guia do Firebase</a>)

<h2 id="deploy">Deploy no Firebase Hosting</h2>

Ver <a href="https://firebase.google.com/docs/hosting" target="_blank">Guia do Firebase Hosting</a>

```bash
npm i -g firebase-tools

# gerar build de produção
npm run build

firebase login

# escolher as opções de configuração do projeto
firebase init

firebase deploy
```

<h2 id="author">Autor</h2>

<a href="https://github.com/jeffersondenilson" target="_blank">
  Jefferson Denilson
</a>

<br><br>
<a href="#top">Voltar ao Topo</a>
