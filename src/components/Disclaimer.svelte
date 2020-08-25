<script>
  import { onMount } from "svelte";

  import { slide } from "svelte/transition";
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
  .icon.has-text-info {
    cursor: pointer;
  }
</style>

<h1 class="title">SPCG</h1>
<h2 class="subtitle">
  Simple Password Card Generator
  {#if closed}
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

{#if !closed}
  <div class="notification is-info" transition:slide>
    <button class="delete" on:click={toggleDisclaimer} />
    <h4 class="title is-4">How does it work ?</h4>
    This is a simple way to remember your password without dependind on an
    online service. You take a text of 416 character minimum. Every space will
    be filled with a number starting from 0.
    <br />
    This will generate a card you can easily reproduce on a paper without this
    app. This card is for 16 character long passwords maximum. Then, you take a
    word for each website (name, domain, anything) to generate your password.
    First letter on the first row, second letter on the second row and so on.
    <br />
    <br />
    This method gives you the opportunity to be detached from web password
    managers and have easy but secured passwords.
    <br />
    <br />
    You can still use this app. Your text will be stored in your browser and it
    will ready to run new passwords everytime you hit it. It is free, there is
    no database, nothing is stored on a server. Use it as you pleased. You can
    even install it on you android phone
  </div>
{/if}
