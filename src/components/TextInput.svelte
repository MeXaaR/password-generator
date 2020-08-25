<script>
  import {
    text,
    generator,
    LENGTH,
    small,
    filledText,
    BIG_SIZE,
    SMALL_SIZE,
  } from "../utils/store";
  import { slide } from "svelte/transition";
  import { onMount } from "svelte";
  export let open;
  let isLongEnough = false;
  $: isLongEnough = $small
    ? $filledText.length >= SMALL_SIZE
    : $filledText.length >= BIG_SIZE;
</script>

<style>
  .wrapper {
    margin-bottom: 15px;
  }
</style>

<div class="wrapper">
  {#if open}
    <div class="field" transition:slide>
      <div class="label">
        Key text for the generator {$filledText.length} / {$small ? SMALL_SIZE : BIG_SIZE}
      </div>
      <textarea
        class="textarea {isLongEnough ? 'is-success' : ''}"
        type="textarea"
        bind:value={$text} />
    </div>
  {/if}
</div>
