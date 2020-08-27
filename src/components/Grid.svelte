<script>
  import {
    BIG_LENGTH,
    generator,
    LENGTH,
    small,
    password,
  } from "../utils/store";
  let passwordArray;
  $: passwordArray = (!!$password && $password.split("")) || [];
</script>

<style>
  .table-container {
    margin: auto;
    display: flex;
    justify-content: center;
  }
  td {
    text-align: center;
  }
  td.is-active {
    background-color: hsl(171, 100%, 41%);
  }
</style>

<div class="table-container">
  <table
    class="table is-bordered is-striped is-narrow is-hoverable"
    id="password-grid">
    <thead>
      <tr>
        <th />
        {#each Object.keys($generator) as letters}
          <th>{letters}</th>
        {/each}
        <th />
      </tr>
    </thead>
    <tfoot>

      <tr>
        <th />

        {#each Object.keys($generator) as letters}
          <th>{letters}</th>
        {/each}
        <th />
      </tr>
    </tfoot>
    <tbody>
      {#each $small ? LENGTH : BIG_LENGTH as number}
        <tr>
          <th>{number}</th>
          {#each Object.keys($generator) as letters}
            <td
              class:is-active={letters
                .split('')
                .find((letter) => letter === passwordArray[number - 1])}>
              {$generator[letters][number - 1] || '00'}
            </td>
          {/each}
          <th>{number}</th>
        </tr>
      {/each}
    </tbody>
  </table>

</div>
