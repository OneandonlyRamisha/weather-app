export async function getData(location: string) {
  const res = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${location}`
  );
  const data = await res.json();

  return {
    props: { data },
  };
}
