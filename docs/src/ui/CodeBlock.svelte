<script module lang="ts">
  import { createHighlighterCore } from 'shiki/core';
  import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
  import css from 'shiki/langs/css.mjs';
  import githubLight from 'shiki/themes/github-light.mjs';

  const highlighter = createHighlighterCore({
    langs: [css],
    themes: [githubLight],
    engine: createJavaScriptRegexEngine(),
  });

  function highlight(code: string) {
    return highlighter.then((instance) =>
      instance.codeToTokens(code, {
        lang: 'css',
        theme: 'github-light',
      }),
    );
  }
</script>

<script lang="ts">
  let { code }: { code: string } = $props();
  const highlighted = $derived(highlight(code));
</script>

{#await highlighted}
  <pre><code>{code}</code></pre>
{:then result}
  <pre aria-label="CSS 示例"><code
      >{#each result.tokens as line, i (i)}{#each line as token, j (j)}<span
            style:color={token.color}>{token.content}</span
          >{/each}{i < result.tokens.length - 1 ? '\n' : ''}{/each}</code
    ></pre>
{:catch}
  <pre><code>{code}</code></pre>
{/await}
