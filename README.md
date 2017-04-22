# @almin/legacy-store-group [![Build Status](https://travis-ci.org/almin/legacy-store-group.svg?branch=master)](https://travis-ci.org/almin/legacy-store-group)

Almin *old* StoreGroup and QueuedStoreGroup implementation.

- `StoreGroup`: Almin <0.12 `StoreGroup` implementation.
- `QueuedStoreGroup`: Almin <0.12 include this implementation.

## :memo: Migration

These stores are deprecated.

- [Main StoreGroup · Issue #141 · almin/almin](https://github.com/almin/almin/issues/141 "Main StoreGroup · Issue #141 · almin/almin")

Almin ^0.12 has new `StoreGroup` that change the arguments of constructor.

You can migrate the *old* `StoreGroup` to the *new* `StoreGroup`.

- [almin/migration-tools: Migration scripts for Almin.](https://github.com/almin/migration-tools "almin/migration-tools: Migration scripts for Almin.")

## Install

Install with [npm](https://www.npmjs.com/):

    npm install @almin/legacy-store-group

## Usage

They have same interface.

```js
import { Store } from "almin";
import { StoreGroup, QueuedStoreGroup } from "@almin/legacy-store-group";
class AStore extends Store {
    constructor() {
        super();
        this.state = {};
    }

    getState() {
        return {
            "aState": this.state
        };
    }
}

const aStore = new AStore();
const storeGroup = new StoreGroup([aStore]);
storeGroup.onChange((changedStores) => {
    const state = storeGroup.getState();
    /*
        {
            "aState": ... 
        }
     */
});
```


### `StoreGroup`

StoreGroup is a collection of Store.

- Throttling change events of Store for UI updating.
- A central manager of stores.

StoreGroup has event queue system.
It means that StoreGroup thin out change events of stores.
If you want to know all change events, and directly use `store.onChange()`.

### `QueuedStoreGroup`

- QueuedStoreGroup is a **UI** parts of Store.
- QueuedStoreGroup has event queue system.
- QueuedStoreGroup not dependent on async function like `setTimeout`.
- QueuedStoreGroup work as Sync or Async.
- QueuedStoreGroup prefer strict design than ./StoreGroup.js

##### Checking Algorithm

QueuedStoreGroup check changed stores and `QueuedStoreGroup#emitChange()` (if necessary) on following case:
- when receive `didExecutedUseCase` events
- when receive events by `UseCase#dispatch`
- when receive events by `UseCase#throwError`

##### Note

- QueuedStoreGroup not allow to change **stores** directly.
- Always change **stores** via execution of UseCase.
- QueuedStoreGroup has not cache state.
 - Cache system should be in your Store.

## Changelog

See [Releases page](https://github.com/almin/legacy-store-group/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/almin/legacy-store-group/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
