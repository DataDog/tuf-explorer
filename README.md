# TUF Explorer

A Web app to visualise your [TUF](https://theupdateframework.io/) data.

**This software is in very early stage for now, use at your own risk! And read the "security" section**

## Features

* human-friendly display of TUF JSON files
* visualise minified JSON files in indented multi-line form
* collects and displays info about keys
* JSON diff between arbitrary commits, with TUF-specific heuristics for improved diffing


## Security

Do not use TUF Explorer to visualise TUF data that you don't already trust.

TUF Exporer does not do any sort of validation of the TUF data for now. For instance it does not check any of the signatures.

Also, for now an attacker could trigger an XSS attack by making you visualise malicious TUF documents. [This is being tracked by issue #1](https://github.com/DataDog/tuf-explorer/issues/1).

Finally, there is no containerized version of TUF Explorer yet. [Containerization is being tracked by issue #2](https://github.com/DataDog/tuf-explorer/issues/2).


## Setup

```
npm install
```


## Run

```
npm run dev
```
