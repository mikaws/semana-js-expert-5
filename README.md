# Google Drive Clone - Semana JS Expert 5.0

Essa foi a quinta Semana Javascript Expert! Código feito por [Erick Wendel](https://github.com/ErickWendel) e refeito por mim durante as aulas da Semana Javascript Expert.

## Preview

![](./resources/demo.gif)

## Checklist Features

- Web API

  - [x] Deve listar arquivos baixados
  - [x] Deve receber stream de arquivos e salvar em disco
  - [x] Deve notificar sobre progresso de armazenamento de arquivos em disco
  - [x] Deve permitir upload de arquivos em formato image, video ou audio
  - [x] Deve atingir 100% de cobertura de código em testes

- Web App
  - [x] Deve listar arquivos baixados
  - [x] Deve permitir fazer upload de arquivos de qualquer tamanho
  - [x] Deve ter função de upload via botão
  - [x] Deve exibir progresso de upload
  - [x] Deve ter função de upload via drag and drop

## Desafios pós projeto a finalizar

1. _Backend_: Salvar o arquivo na AWS ou qualquer serviço de storage
   - Nosso projeto hoje armazena arquivos em disco. O desafio é via Stream, fazer upload para algum serviço na nuvem
   - Como plus, manter 100% de code coverage, ou seja, criar testes para a nova feature
2. _Frontend_: Adicionar testes no frontend e alcançar 100% de code coverage
   - Usar o mesmo processo para criar testes unitários no frontend com Jest
3. _Infraestrutura_: Publicar aplicação com seu SSL customizado em máquina virtual
   - Criar um certificado (pode ser com o _Let's Encrypt_) e adicionar na aplicação

## Créditos ao Layout <3

- O Layout foi adaptado a partir do projeto do brasileiro [Leonardo Santo](https://github.com/leoespsanto) disponibilizado no [codepen](https://codepen.io/leoespsanto/pen/KZMMKG).

## FAQ

- `NODE_OPTIONS` não é um comando reconhecido pelo sistema, o que fazer?

  - Se você estiver no Windows, a forma de criar variáveis de ambiente é diferente. Você deve usar a palavra `set` antes do comando.
  - Ex: ` "test": "set NODE_OPTIONS=--experimental-vm-modules && npx jest --runInBand",`

- Certificado SSL é inválido, o que fazer?

  - Esse erro acontece porque gerei um certificado atrelado ao usuário da minha máquina.
  - Você pode clicar em prosseguir no browser e usar o certificado invalido que o projeto vai continuar funcionando, mas se quiser gerar o seu próprio, escrevi o passo a passo em [./certificates](./certificates)

- Rodei `npm test` mas nada acontece, o que fazer?
  - Verifique a versão do seu Node.js. Estamos usando na versão 16.8. Entre no [site do node.js](https://nodejs.org) e baixe a versão mais recente.
