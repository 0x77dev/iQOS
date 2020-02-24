# iQOS
[Not official] **iQOS Device BLE Communication Library**, written in **TypeScript**, using _web-bluetooth_ **api**.

## Getting started
### Installing Library
```bash
# Using Yarn
yarn add iqos
``` 
or 
```bash
# Using NPM
npm i -S iqos
```
### Working with Library
```typescript
import { iQOS } from 'iqos';
// Or using default export:
// import iQOS from 'iqos';

const handleUpdate = (iqosInstance) => {
    console.log(iqosInstance.batteryValue); // Example output -> {holderReady: true, case: 100}
}

// For Browser use: 
const iqos = new iQOS(navigator.bluetooth, handleUpdate);

console.log(iqos.batteryValue); // Example output -> {holderReady: true, case: 100}

// Documentation not completed, see details in sources or types.
```
---
> iQOS is a trademark of Philip Morris International.