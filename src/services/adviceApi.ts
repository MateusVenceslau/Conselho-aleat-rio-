export type AdviceResponse = {
  slip: {
    id: number;
    advice: string;
  };
};

export async function getRandomAdvice() {
  const response = await fetch("https://api.adviceslip.com/advice", {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Não foi possível carregar um conselho agora.");
  }

  const data = (await response.json()) as AdviceResponse;
  return data.slip;
}
