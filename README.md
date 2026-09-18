# LONG LIFE

Recriação local da referência fornecida. React, Vite, TypeScript, CSS, GSAP, ScrollTrigger e Lenis. Nenhum deploy foi realizado.

## Executar

Requer Node.js 22.12+ ou 24+.

```sh
npm install
npm run dev
```

```sh
npm run build
npm run preview
```

As fontes são instaladas via Fontsource e servidas localmente. Fotografias e logo são exclusivamente da pasta fornecida.

## Editar conteúdo

- `src/data/plans.ts`: nomes, valores e benefícios dos planos.
- `src/data/statistics.ts`: métricas demonstrativas.
- `src/data/professionals.ts`: retratos da equipe.
- `src/styles/variables.css`: cores e tipografia.
- `src/components/Footer.tsx`: contatos, links e horários.

## Interações

Menu compacto, navegação por âncoras, seleção e rotação de planos, carrossel de histórias, detalhes em modal, formulário de email com validação e retorno ao topo. O formulário é apenas uma demonstração local: não envia nem armazena dados. A matrícula informa o caráter demonstrativo dos planos. Redes sociais não têm destinos configurados.

Lenis sincroniza com o ticker do GSAP e o ScrollTrigger. O site respeita `prefers-reduced-motion`. Breakpoints: abaixo de 768px, de 768px a 1199px e a partir de 1200px.

## Correspondência com a referência

Hero largo com cabeçalho sobreposto e logo central; treino em composição assimétrica; painel cinza com plano branco e cards recortados; painel laranja com histórias à direita e quatro métricas; newsletter em duas colunas; footer branco. O amarelo foi substituído por `#F68806`.

- Hero: `hero.png`, cena horizontal com profissionais e alunos.
- Treino: `training.png`, acompanhamento em enquadramento vertical.
- Equipe: `professional-1.png` e `professional-2.png`.
- Histórias: `hero.png`, `beach.png` e `outdoor.png`.
- Localização: `structure.png`. Não foram fornecidos mapa ou endereço, por isso não foi inventado um mapa.
- Logo: `logo.png`, asset original fornecido.

Não foram fornecidos vídeos, contatos, horários ou redes sociais oficiais. As histórias abrem fotografias; os dados ausentes não foram inventados.

## Validação desta entrega

- TypeScript: verificado sem erros.
- Compilação alternativa local com o executável esbuild incluído pelo Vite: concluída.
- Prévia HTTP local: resposta 200.
- Fontes e imagens: locais, incluídas no build.
- O sandbox deste ambiente bloqueou subprocessos com pipes (`spawn EPERM`), impedindo a execução completa do build padrão do Vite. O projeto mantém a configuração padrão do Vite para execução fora dessa limitação.
- O acesso do navegador à prévia foi recusado pela política de permissões. **A comparação por screenshots e os testes visuais em desktop/mobile permanecem pendentes. Não há certificação de fidelidade pixel-perfect.**

`build-local.ps1` reproduz a compilação alternativa utilizada neste ambiente Windows. O diretório `dist/` contém a versão compilada. A prévia desta sessão usa `http://127.0.0.1:5174/` enquanto o servidor estiver ativo.
