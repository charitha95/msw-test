import type { NextPage } from "next";
import useSWR from "swr";

async function fetcher(url: string): Promise<any[]> {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

const Home: NextPage = () => {
  const { data, error } = useSWR("/api/colors", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  // render data
  return (
    <div data-testid="color-list">
      {data?.map((color) => (
        <p key={color.value}>{color.color}</p>
      ))}
    </div>
  );
};

export default Home;
