import HttpMethod from "@/enums/HttpMethod";

async function fetchData<T>(
  url: string,
  method?: HttpMethod,
  data?: Object
): Promise<T | null> {
  try {
    const init: RequestInit = {
      method: method ? method : "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (data) {
      init.body = JSON.stringify(data);
    }

    const res = await fetch(url, init);

    const payload: T = await res.json();
    return payload;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export default fetchData;
