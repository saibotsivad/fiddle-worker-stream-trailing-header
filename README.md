# Trailing Headers

I had an idea that I could add some spicy functionality to an API if I could have the API send "headers" after all the body data was sent.

Dubious idea, but apparently in HTTP/3 you can have "trailing header frames" https://http3-explained.haxx.se/en/h3/h3-streams#http-response

After I found that, I was able to track down a similar idea in HTTP/1.1 https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Trailer

With that new-found knowledge, I wanted to make a little demo so I could see how it works in browsers and other CLI tools, e.g. `cURL`, and in particular I wanted to see how I could make it work in a Cloudflare Worker.

## Deploy

Copy the configuration example to your own file:

```shell
cp configuration.example.sh configuration.sh
```

Then go to the [Cloudflare dashboard](https://dash.cloudflare.com/profile/api-tokens) to
generate a token, and set it in your `configuration.sh` file.

Finally, simply run `npm run deploy`

## Cloudflare Setup

For a subdomain, you'll need to add an `AAAA` DNS record pointing to `100::` (the
reserved IPv6 discard prefix).

That comes from the [Cloudflare docs](https://developers.cloudflare.com/workers/platform/routes):

> Subdomains must have a DNS Record
>
> All subdomains must have a DNS record to be proxied on Cloudflare and
> used to invoke a Worker. For example, if you want to put a worker on
> `myname.example.com`, and you've added `example.com` to Cloudflare but
> have not added any DNS records for `example.com`, any request to
> `myname.example.com` will result in the error `ERR_NAME_NOT_RESOLVED`.
>
> To support this, you should use the Cloudflare dashboard to add an
> `AAAA` record for `myname` to `example.com`, pointing to `100::` (the
> reserved IPv6 discard prefix).
