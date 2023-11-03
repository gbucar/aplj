import stations from "./stations.json";

export const load = async ({url, fetch}:any) => {
    let from = url.searchParams.get("from");
    let to = url.searchParams.get("to");
    let date = url.searchParams.get("date");

    if (!from || !to || !date) {
        return {};
    }

    from = stations.filter(a=>a.s === from)[0].id;
    to = stations.filter(a => a.s == to)[0].id;

    const res = await fetch(`https://www.ap-ljubljana.si/vozni-red/__data.json?vstop=${from}&izstop=${to}&datum=${date}&x-sveltekit-invalidated=00001`, {
        "credentials": "omit",
    "headers": {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/119.0",
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.5",
            "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "Sec-GPC": "1"
    },
    "referrer": "https://www.ap-ljubljana.si/",
        "method": "GET",
    "mode": "cors"
    });

    let busData= JSON.parse((await res.text()).toString().split("\n")[0]).nodes;
    busData = busData.filter((node:any) => node.type != "skip")[0].data;
    let buses:any[] = [];
    let lineDetails:any = {};
    busData[0]

    for (let key in busData[0]) {           
        lineDetails[key] = busData[busData[0][key]];
    }
    busData.map((point:any) => {
        if (typeof point === 'object' &&
            !Array.isArray(point) &&
            point !== null &&
            point.departure_time
           ) {
               let currentBus:any = {};
               for (let key in point) {           
                   currentBus[key] = busData[point[key]];
               }
               buses.push(currentBus);
           }
    });

    return {buses, lineDetails};
}
