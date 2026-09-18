<script lang="ts">
  let active = $state(false);
  const classes = $derived(['ordinary', { active }]);
</script>

<button onclick={() => (active = !active)}>Toggle plain class</button>
<div data-testid="plain-class" class={classes} style="color: red">ordinary classes</div>
