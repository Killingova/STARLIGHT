export async function GET(request: Request) {
  // get the query parameter from the request URL
  console.log("GET ");
  const url = new URL(request.url);
  const knr= url.searchParams.get('nr');
  console.log("kundennr ", knr);
  // make a GET request to the external API with the query parameter
  const response = await fetch(`https://qas.freyadv.de/eserviceschein/api/kunde/${knr}`);

  // check if the response is ok
  if (response.ok) {
    // parse the response as JSON
    const data = await response.json();
    // return the data as a response
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });
  } else {
    // return an error response
    return new Response('Something went wrong', { status: 500 });
  }
}