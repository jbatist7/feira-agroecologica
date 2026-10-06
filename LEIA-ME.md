# Feira Agroecológica — site para o GitHub Pages

Quatro páginas instaláveis no celular, que conversam com o seu Apps Script:

| Página | Para quem | Abre com |
|---|---|---|
| `encomendas.html` | Clientes (e o gerente, para lançar pedidos) | sem login |
| `fornecedor.html` | Cada fornecedor | nome + PIN dele |
| `coordenacao.html` | Coordenação | PIN da coordenação |
| `gerente.html` | Gerente (e a coordenação, só consulta e pagamentos) | PIN do gerente ou da coordenação |

A planilha **não** fica no GitHub. Só o gerente (dono da planilha) a acessa. As páginas enviam pedidos ao Apps Script, que confere o PIN em cada chamada.

## 1. Atualizar o Apps Script (uma vez)
1. No editor, crie um arquivo **Script** chamado `Api` e cole o conteúdo do `Api.gs`.
2. Cole também os arquivos atualizados (`Gerente.gs`, `Base.html`, `Pedido1.html`, `Gerente1.html`, `Coordenacao1.html`).
3. **Implantar > Gerenciar implantações > lápis > Nova versão > Implantar.** O endereço `/exec` continua o mesmo.
4. A implantação deve estar como **Executar como: Eu** e **Quem tem acesso: Qualquer pessoa**.

## 2. Criar o repositório
1. No GitHub, **New repository**, nome `feira-agroecologica` (público).
2. **Add file > Upload files** e arraste **todo o conteúdo desta pasta** (inclusive as pastas `css`, `js` e `icons`). **Commit changes**.

## 3. Ligar o GitHub Pages
1. **Settings > Pages**. Em *Build and deployment*: Source = *Deploy from a branch*, Branch = `main`, pasta `/ (root)`. Salvar.
2. Em 1 a 2 minutos o site abre em `https://SEU-USUARIO.github.io/feira-agroecologica/`.

## 4. Conferir o endereço do Apps Script
Abra `js/config.js`. A linha `API_URL` deve ter o endereço da sua implantação (termina em `/exec`). Se um dia você publicar como outra implantação, é o único lugar a trocar.

## 5. Instalar no celular
Abra a página específica (por exemplo `fornecedor.html`) e instale. Cada página vira um app com nome e ícone próprios.
- **Android (Chrome):** toque em *Instalar* na barra que aparece, ou menu ⋮ > *Instalar app* / *Adicionar à tela inicial*.
- **iPhone (Safari):** botão Compartilhar > *Adicionar à Tela de Início*.

## 6. Atualizações
Substitua os arquivos no GitHub (Upload files, mesmo nome). O app busca a versão nova sempre que há internet. Para forçar a renovação do que ficou guardado no celular, altere `CACHE = 'feira-v1'` para `'feira-v2'` no `sw.js`.

## 7. Segurança
- O que fica público no GitHub: só as telas e o endereço do Apps Script. Nenhum dado, PIN ou chave PIX.
- Cada chamada exige o PIN no servidor. Depois de 8 erros seguidos o acesso é bloqueado por 10 minutos.
- Os PINs dos fornecedores ficam na aba Fornecedores da planilha. Compartilhe a planilha apenas com o gerente.
- O app guarda no celular apenas o nome do fornecedor (para não ter que escolher de novo). O PIN nunca é guardado.

## 8. Se algo não funcionar
- **"Resposta inválida do servidor":** falta o `Api.gs` ou a nova versão da implantação.
- **"Sem conexão":** sem internet, ou a implantação não está como "Qualquer pessoa".
- **Tela antiga depois de atualizar:** feche o app e abra de novo, ou aumente a versão do `CACHE` no `sw.js`.
- As páginas do próprio Apps Script (`...exec?page=gerente` etc.) continuam funcionando como reserva.
