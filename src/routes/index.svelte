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

  let closed = true;

  onMount(() => {
    closed = localStorage.getItem("disclaimer") || false;
  });
  const toggleDisclaimer = () => {
    localStorage.setItem("disclaimer", true);
    closed = !closed;
  };
</script>

<style>
  .checkbox {
    margin-right: 10px;
  }
  main {
    position: relative;
    max-width: 56em;
    background-color: white;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }

  .icon.has-text-info {
    cursor: pointer;
  }
  .hero {
    background-color: rgb(254, 217, 4);
  }
</style>

<section class="hero">
  <div class="hero-body">
    <div class="container">
      <h1 class="title">SPCG</h1>
      <h2 class="subtitle">
        Simple Password Card Generator {#if closed}
          <span class="icon has-text-info" on:click={toggleDisclaimer}>
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M15.07,11.25L14.17,12.17C13.45,12.89 13,13.5 13,15H11V14.5C11,13.39
              11.45,12.39 12.17,11.67L13.41,10.41C13.78,10.05 14,9.55 14,9C14,7.89
              13.1,7 12,7A2,2 0 0,0 10,9H8A4,4 0 0,1 12,5A4,4 0 0,1 16,9C16,9.88
              15.64,10.67 15.07,11.25M13,19H11V17H13M12,2A10,10 0 0,0 2,12A10,10 0
              0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z" />
            </svg>
          </span>
        {/if}
      </h2>
    </div>
  </div>
</section>

<main>
  <Disclaimer {closed} {toggleDisclaimer} />
  <div class="actions buttons">
    <button class="button is-info" on:click={toggleKeyText}>Edit key text</button>
    <button class="button is-warning" on:click={text.reset}>
      Reset Key text
    </button>
    <button class="button is-success" on:click={downloadGrid}>
      Download grid
    </button>
    <label class="checkbox">
      <input type="checkbox" bind:checked={$small} /> Small card
    </label>
  </div>

  <TextInput open={keyText} />
  <PasswordInput />
  <Grid />
</main>
