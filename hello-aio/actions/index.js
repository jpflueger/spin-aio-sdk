// Adapted from https://github.com/chrismatteson/OpenWhisk-to-Spin

// TODO: we can replace this with webpack at build time to 
//       build different components for different actions
import { main } from "./hello";

// This is Spin code to seemlessly handle OpenWhisk apps written for Node.js
export async function handleRequest(request) {
    let params = {};
    try {
        // Extract parameters based on request method and content type
        if (request.method === 'GET') {
            const url = new URL(request.uri);
            console.log(url.searchParams);
        
            // Accessing queryParams directly
            const queryParams = url.searchParams.queryParams;
            console.log(queryParams);
        
            for (const key in queryParams) {
                if (queryParams.hasOwnProperty(key)) {
                    const value = queryParams[key];
                    console.log(`Key: ${key}, Value: ${value}`);
                    params[key] = value;
                }
            }
        } else if (request.method === 'POST') {
            console.log("-1")
            console.log(request.headers['content-type']);
            const contentType = request.headers['content-type'] || '';
            console.log("-.75")
            let body = await request.text();
            console.log("-.5")
            if (contentType.includes('application/json')) {
                params = JSON.parse(body);
            } else if (contentType.includes('application/x-www-form-urlencoded')) {
                console.log(body);

                // Manually parse the URL-encoded string
                const queryParams = body.split('&');
                console.log("queryParams: ", queryParams);
                for (const param of queryParams) {
                    const [key, value] = param.split('=');
                    if (key) {
                        params[decodeURIComponent(key)] = decodeURIComponent(value || '');
                        console.log(`Key: ${key}, Value: ${params[key]}`);
                    }
                }
            }
        }

        console.log(`Params passed to main:`, params); // Additional logging

        // Call the main function
        var response = main(params) || {};

        // Support sync/async
        if (response instanceof Promise) {
            response = await response;
        }

        // Determine the response payload
        const payload = response.payload || response.body || '';

        // Construct the response object
        const output = {
            status: response.status || 200,
            headers: response.headers || { "content-type": "text/plain" },
            body: payload
        };

        return output;

    } catch (error) {
        // Handle any errors
        return {
            status: 500,
            headers: { "content-type": "text/plain" },
            body: `Error: ${error.message}`
        };
    }
}
