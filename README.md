# now-parcel

A Now v2 Parcel builder.

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
