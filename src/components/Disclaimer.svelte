<script>
  import { slide } from "svelte/transition";
  export let closed, toggleDisclaimer;
</script>

{#if !closed}
  <div class="notification is-info" transition:slide>
    <button class="delete" on:click={toggleDisclaimer} />
    <h4 class="title is-4">How does it work ?</h4>
    This is a simple way to remember your password without dependind on an
    online service. You take a text of 208 character minimum. Every space will
    be filled with a number starting from 0. <br /> This will generate a card you
    can easily reproduce on a paper without this app. This card is for 16 character
    long passwords maximum. Then, you take a word for each website (name, domain,
    anything) to generate your password. First letter on the first row, second letter
    on the second row and so on. <br />
    <br /> This method gives you the opportunity to be detached from web password
    managers and have easy but secured passwords. <br />
    <br /> You can still use this app. Your text will be stored in your browser and
    it will ready to run new passwords everytime you hit it. It is free, there is
    no database, nothing is stored on a server. Use it as you pleased. You can even
    install it on you android phone
  </div>
{/if}
