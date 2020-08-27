<script>
  import { onMount } from "svelte";

  import { slide } from "svelte/transition";
  import Grid from "../components/Grid.svelte";
  import { generator, text, small, filledText } from "../utils/store";
  import TextInput from "../components/TextInput.svelte";
  import PasswordInput from "../components/PasswordInput.svelte";
  import Disclaimer from "../components/Disclaimer.svelte";
  import domtoimage from "dom-to-image";

  let keyText = !$text.length;

  const toggleKeyText = () => {
    keyText = !keyText;
  };

  const downloadGrid = () => {
    var node = document.getElementById("password-grid");
    var options = {
      quality: 0.95,
    };

    domtoimage.toJpeg(node, options).then((dataUrl) => {
      var a = document.createElement("a");
      a.href = dataUrl;
      a.download = `my-SMPCG-grid-${new Date().valueOf()}.png`;
      a.click();
    });
  };
</script>

<style>
  .checkbox {
    margin-right: 10px;
  }
</style>

<svelte:head>
  <title>SPCG || Simple Password Card Generator</title>
</svelte:head>

<Disclaimer />

<div class="actions buttons">
  <button class="button is-info" on:click={toggleKeyText}>Edit key text</button>
  <button class="button is-warning" on:click={text.reset}>
    Reset Key text
  </button>
  <button class="button is-success" on:click={downloadGrid}>
    Download grid
  </button>
  <label class="checkbox">
    <input type="checkbox" bind:checked={$small} />
    Small card
  </label>
</div>

<TextInput open={keyText} />
<PasswordInput />
<Grid />
