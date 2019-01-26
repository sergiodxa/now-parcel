# now-parcel

A Now v2 Parcel builder.

<a href="https://www.patreon.com/sergiodxa">
	<img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>

## Usage

Add it to your `now.json` as:

```json
{
  "builds": [
    { "src": "index.html", "use": "now-parcel" }
  ]
}
```

### Configuration

You can send any [Parcel bundler option](https://en.parceljs.org/api.html) adding a `config` key to the line in your `now.json`.

```json
{
  "builds": [
    { "src": "index.html", "use": "now-parcel", "config": { "minified": false } }
  ]
}
```

> **Note**: cache, watch and hmr are disabled always
