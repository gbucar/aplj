<script lang="ts">
    import stations from "./stations.json";
    export let data;
    console.log(data.lineDetails);
</script>

<datalist id="stations">
    {#each stations as station}
         <option value={station.s}>{station.s}</option>
    {/each}
</datalist>     

<form>
    <input autoComplete="off" list="stations" name="from">
    <input autoComplete="off" list="stations" name="to" />
    <input type="date" name="date" />
    <button type="submit">išči</button>
</form>

<div>{data.lineDetails.departure} - {data.lineDetails.destination}</div>

{#if data.buses}
    {#each data.buses as bus}
         <div>
             {#if !bus.is_boarding_disabled}
                 <h2>{bus.departure_time} - {bus.arrival_time} ({bus.duration.trim()})</h2>
             {/if}
         </div>
    {/each}
{/if}
