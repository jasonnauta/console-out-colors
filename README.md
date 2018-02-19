# console-out-colors
A Simple node module to add colors to terminal consoles.

## Usage
```js
const colored = require('./index');
colored.color('error.text').error('This is the Error: %s', 'Here');
```

## Standard Colors
  - ```basic.title``` - Black Text on White Background
  - ```basic.text``` - STD White text
  - ```error.title``` - White Text on Red Background
  - ```error.text``` - Red Text
  - ```info.title``` - White Text on Cyan Background
  - ```info.text``` - Cyan Text
  - ```warn.title``` - White Text on Yellow Background
  - ```warn.text``` - Yellow Text

## Custom Colors
  - ```custom.title.$1``` - Background Colors
  - ```custom.text.$1``` - Foreground Colors
    1. [k] Black
    2. [y] Yellow
    3. [b] Blue
    4. [m] Magenta
    5. [c] Cyan
    6. [w] White
    7. [r] Red
    8. [g] Green
