addEventListener("fetch", event => {
	event.respondWith(handleRequest(event.request))
  })
  
  const corsHeaders = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
	"Access-Control-Max-Age": "86400",
  }

async function handleRequest(request) {
	if (request.method === "OPTIONS") {
		response = handleOptions(request)
		return response
	}  

	if (request.method === "GET"){
		return new Response(request.headers.get('CF-Connecting-IP'))
	}

	if (request.method !== "POST"){
		return new Response("POST Endpoint Only!")
	}

	if (request.method === "POST"){
		const body = await request.json()
		let ip = request.headers.get('CF-Connecting-IP')
		const country = request.headers.get('cf-ipcountry');

		return new Response("null")
	}
}