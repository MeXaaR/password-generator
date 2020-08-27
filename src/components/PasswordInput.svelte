<script>
  import {
    password,
    encrypted,
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
        <div class="field">
          <p class="control">
            <input
              class="input is-static"
              type="text"
              value={$encrypted}
              readonly />
          </p>
        </div>
      </div>
    </div>
  </div>

