# Guia Para Contribuidores do Alice Bot

## Index

- [Como contribuir?](#como-contribuir)
   - [1º Passo](#1º-passo) - Fork
   - [2º Passo](#2º-passo) - Clonagem
   - [3º Passo](#3º-passo) - Add linke para repositório oficial
   - [4º Passo](#4º-passo) - Crie uma branch para contribuir
   - [5º Passo](#5º-passo) - Adicione e commite a contribuição
   - [6º Passo](#6º-passo) - Envie a branch com a contribuição para o fork
   - [7º Passo](#7º-passo) - Faça o pull requets da branch para o projeto oficial
- [Contribuição aprovada, o quê fazer?](#contribuição-aprovada-o-quê-fazer)
   - [Deletando branch antiga localmente](#deletando-branch-antiga-localmente)
- [Sincronizando o fork/clone com o repositório oficial](#sincronizando-o-forkclone-com-o-repositório-oficial)
   - [Sincronize o clone](#sincronize-o-clone)
   - [Sincronize o fork](#sincronize-o-fork)
- [Links úteis](#links-úteis)


## Como contribuir?

Para fazer contribuições certifique-se de que tenha o [git](https://git-scm.com/) instalado em seu ambiente.

Com o **git** já instalado, siga os passoa abaixo.

### 1º Passo

Faça o **fork** desse repositório para sua conta clicando no botão:

![image](https://user-images.githubusercontent.com/50463866/103658686-4cd2f500-4f4a-11eb-9f9d-3ba714bfc815.png)

Você será redirecionado para sua conta assim que o processo for concluído.

### 2º Passo

Após ter o repositório em sua conta, faça o **clone** em seu ambiente local:

```bash
$ git clone https://github.com/<NOME_DA_SUA_CONTA>/WhatsAppBot_ProjectAlice.git
```

### 3º Passo

Com o clone em seu ambiente, linke o repositório local ao remoto da organização [Coding in Community](https://github.com/Coding-in-community/WhatsAppBot_ProjectAlice):

```bash
$ git remote add upstream https://github.com/Coding-in-community/WhatsAppBot_ProjectAlice.git
```

Isso servirá para sincronizar atualizações feitas no repositório oficial para seu ambiente local.

> OBS: Esse comando só é necessário executar uma unica vez após a clonagem.

Para verificar se ocorreu tudo certo, execute em no terminal:

```bash
$ git remote --v
```

Se tudo ocorreu bem, deverá ter uma saída semelhante a essa:

```bash
origin  https://github.com/<NOME_DA_SUA_CONTA>/WhatsAppBot_ProjectAlice.git (fetch)
origin  https://github.com/<NOME_DA_SUA_CONTA>/WhatsAppBot_ProjectAlice.git (push)
upstream        https://github.com/Coding-in-community/WhatsAppBot_ProjectAlice.git (fetch)
upstream        https://github.com/Coding-in-community/WhatsAppBot_ProjectAlice.git (push)
```

### 4º Passo

Crie uma **branch** para fazer sua contribuição:

```bash
$ git checkout -b feature/nome_da_feature
```

Agora adicione suas contribuições para o projeto.

### 5º Passo

Adicione suas contribuições:


```bash
$ git add arquivo_exemplo.js
```

> OBS: Adicione todos os arquivos/diretórios adicionados e/ou modificados


Agora faça o **commit**:

```bash
$ git commit -m "Descrição da contribuição"
```

### 6º Passo

Concluindo sua contribuição envie-a para o repositório remoto em sua conta:

```bash
$ git push origin feature/nome_da_feature
```

### 7º Passo

Em sua conta no github envie um **Pull Request** com sua contribuição para o repositório oficial:

![image](https://user-images.githubusercontent.com/50463866/103661883-0089b400-4f4e-11eb-8752-3c341fdc3e4a.png)

Agora aguarde a revisão de um dos mantenedores do projeto.

## Contribuição aprovada, o quê fazer?

Depois de um pull request aprovado, caso não queira contribuir novamente, poderá apagar a branch que usou para fazer a contribuição na própria página do Pull Request ou excluir o fork de sua conta.

Caso queira fazer outras contribuições que não tenha relação com a branch da contribuição antiga, delete a antiga e crie uma nova.

### Deletando branch antiga localmente

Vá para a branch padrão:

```bash
$ git checkout master
```

Delete a antiga:

```bash
$ git branch -d nome_da_branch_antiga
```

Agora crie uma nova branch e repita os passos [4º Passo](#4º-passo), [5º Passo](#5º-passo), [6º Passo](#6º-passo) e [7º Passo](#7º-passo)


## Sincronizando o fork/clone com o repositório oficial

Para sincronizar o fork/clone com as novas features que tem no repositório oficial siga os passos abaixo:

### Sincronize o clone

Certifique-se de estar na branch padrão, que para esse projeto é a `master`:

```bash
$ git checkout master
```

Agora sincronize com:

```bash
$ git pull upstream master
```

Após isso o ambiente local estará sincronizado.

### Sincronize o fork

Com o ambiente local sincronizado, sincronize o remoto também:

```bash
$ git push origin master
```

Pronto, ambiente local e remoto sincronizado com o oficial.


## Links úteis

Caso tenha dúvida com algum comando usado ou queira entender melhor, veja um dos links abaixo:

- [Documentação do git](https://git-scm.com/docs)
- [Curso de Git - Rodrigo Branas](https://www.youtube.com/playlist?list=PLQCmSnNFVYnRdgxOC_ufH58NxlmM6VYd1)
