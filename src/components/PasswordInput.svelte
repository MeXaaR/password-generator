<script>
  import {
    password,
    encrypted,
    small,
    filledText,
    SMALL_SIZE,
    BIG_SIZE,
  } from "../utils/store";
  import { slide } from "svelte/transition";
  let isLongEnough = false;
  $: isLongEnough = $small
    ? $filledText.length >= SMALL_SIZE
    : $filledText.length >= BIG_SIZE;

  const updateValue = (e) => {
    const simplified = e.target.value.toLowerCase().replace(/[^a-z]/g, "");
    password.set(simplified);
  };
  const copyPassword = () => {
    console.log($encrypted);
    navigator.clipboard.writeText($encrypted).then(
      function () {
        console.log("Async: Copying to clipboard was successful!");
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  };
</script>

<style>
  .wrapper {
    margin-bottom: 15px;
  }
</style>

<div class="wrapper">
  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <div class="label">Password</div>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control">
          <input
            class="input"
            value={$password}
            on:input={updateValue}
            placeholder="Type your word here" />
        </p>
      </div>
    </div>
  </div>
  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <div class="label">Encrypted</div>
    </div>
    <div class="field-body">
      <div class="field has-addons">
        <p class="control">
          <input
            placeholder="You new password here"
            class="input"
            type="text"
            bind:value={$encrypted} />
        </p>
        <div class="control">
          <button class="button is-success" on:click={copyPassword}>
            Copy
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
