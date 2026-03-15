## TimeBubble

This is a React Native Expo project.

Arquitetura atual: app somente mobile/front-end, sem API própria, com armazenamento local no dispositivo.

#### - To up and run follow steps bellow

**Access Project folder and**

- Install Dependencies:
```sh
    $ yarn
```

- Run with Flavor:
```sh
    $ yarn ios
    $ yarn android
```

- Run Expo:
```sh
    $ yarn start
```

### And how about Expo? Over The Air (OTA) and cloud build flow

Install `expo-cli` on your environment 

- **Dont forgot to check your app version in `app.json` file** 
- Check how your are and if necessary, make your login into expo-cli in your terminal
```sh
    $ expo whoami
    $ expo login
```

- Build to Staging
```sh
    $ yarn build:android:staging
    $ yarn build:ios:staging
```

- Build to Production
```sh
    $ yarn build:android:production
    $ yarn build:ios:production
```


[OPTIONAL]

- Configure over-ther-air
```sh
    $ npx eas update:configure
```

- Publish over-the-air to Staging
```sh
    $ yarn publish:staging
```

- Publish over-the-air to Production
```sh
    $ yarn publish:production
```

## ⚠️ Regras obrigatórias do projeto

Este repositório tem regras obrigatórias em:
- `AGENTS.md` (global)
- `src/**/AGENTS.md` (regras por pasta)
- `.agents/skills/*` (procedimentos obrigatórios)

Antes de gerar código, sempre:
1) Ler `AGENTS.md`
2) Checar se existe `AGENTS.md` na pasta alvo
3) Seguir a skill adequada em `.agents/skills`

#### Created and maintained by **Jonathan Febraio** @ 2026
