# JavaScript to TypeScript Conversion Guide

## Type Definitions

### ZEPP OS Global Types
The ZEPP OS runtime provides these types globally:

```typescript
declare const hmUI: {
  widget: {
    BUTTON: 1;
    IMG: 2;
    TEXT: 3;
    FILL_RECT: 4;
    GROUP: 5;
    // ... other widget types
  };
  align: {
    LEFT: 0;
    CENTER_H: 1;
    RIGHT: 2;
    TOP: 0;
    CENTER_V: 1;
    BOTTOM: 2;
  };
  text_style: {
    NONE: 0;
    WRAP: 1;
  };
  event: {
    CLICK_DOWN: 'click_down';
    CLICK_UP: 'click_up';
    MOVE: 'move';
    MOVE_IN: 'move_in';
    MOVE_OUT: 'move_out';
  };
  prop: {
    MORE: 'more';
    X: 'x';
    Y: 'y';
    W: 'w';
    H: 'h';
    VISIBLE: 'visible';
  };
  createWidget: (type: number, config: HmUIWidgetOptions) => HmUIWidget;
  getTextLayout: (text: string, config: { text_size: number; text_width: number }) => { width: number; height: number };
  // ... other hmUI methods
};

declare const hmApp: {
  gotoPage: (config: { url: string; param?: string }) => void;
  goBack: () => void;
  // ... other hmApp methods
};

// Event types
interface TouchEvent {
  x: number;
  y: number;
}

// Widget types
interface HmUIWidget {
  addEventListener: (event: string, callback: (e: TouchEvent) => void) => void;
  removeEventListener: (event: string, callback: (e: TouchEvent) => void) => void;
  setProperty: (prop: string, value: any) => void;
  getProperty: (prop: string) => any;
  getType: () => number;
}

interface HmUIWidgetOptions {
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  text?: string;
  color?: number;
  align_h?: number;
  align_v?: number;
  text_size?: number;
  text_style?: number;
  src?: string;
  alpha?: number;
  [key: string]: any;
}
```

### Common Project Interfaces
Standard interfaces used in the UI components:

```typescript
interface ListEntry {
  widget: HmUIWidget;
  viewHeight: number;
  positionY: number;
  _lastHeight?: number;
  _index?: number;
  _setPositionY: (y: number) => void;
  group?: HmUIWidget;
  iconView?: HmUIWidget;
  textView?: HmUIWidget;
  value?: any;
  touchManager?: TouchEventManager;
}

interface CardConfig {
  color?: number;
  offsetX?: number;
  radius?: number;
  width?: number;
  height?: number;
  hiddenButton?: string;
  hiddenButtonCallback?: () => void;
  onTap?: () => void;
  dontChangePosY?: boolean;
}
```

## ES6 Features Used

- Class declarations with inheritance
- Arrow functions
- Template literals
- Destructuring assignments
- Optional chaining
- Nullish coalescing
- Rest/Spread operators

## Common Conversion Patterns

### 1. Class Conversion
From JavaScript:
```javascript
class HomeScreen extends ConfiguredListScreen {
  constructor(params) {
    super();
    this.params = JSON.parse(params || '{}');
  }
}
```

To TypeScript:
```typescript
interface HomeScreenParams {
  page?: string;
  [key: string]: any;
}

class HomeScreen extends ConfiguredListScreen {
  private params: HomeScreenParams;
  
  constructor(params: string) {
    super();
    this.params = JSON.parse(params || '{}');
  }
}
```

### 2. Event Handlers
From JavaScript:
```javascript
widget.addEventListener(hmUI.event.CLICK_DOWN, (e) => {
  console.log(e);
});
```

To TypeScript:
```typescript
interface TouchEvent {
  x: number;
  y: number;
}

widget.addEventListener(hmUI.event.CLICK_DOWN, (e: TouchEvent) => {
  console.log(e);
});
```

### 3. Configuration Objects
From JavaScript:
```javascript
const config = {
  text: userConfig.text || '',
  color: userConfig.color || 0xFFFFFF
};
```

To TypeScript:
```typescript
interface Config {
  text: string;
  color: number;
}

const config: Required<Config> = {
  text: userConfig.text ?? '',
  color: userConfig.color || 0xFFFFFF
};
```

## Best Practices

1. Use `interface` for object shapes that can be implemented by classes
2. Use `type` for unions, intersections, and simple object shapes
3. Prefer `??` over `||` for null/undefined checks
4. Use `Required<T>` when making all properties required
5. Use `Partial<T>` when making all properties optional
6. Always type event handlers and callbacks

## Best Practices for ZEPP OS Development

### 1. Code Organization
- Separate structure, style and behavior into different files
- Use class-based organization for complex logic
- Keep UI rendering and event dispatching in main page files
- Store styles in separate `.styles.ts` files
- Example structure:
```typescript
// page.ts
import { TEXT_STYLE } from './page.styles'
import TextClass from './text.class'

Page({
  state: {
    textInstance: null as TextClass | null
  },
  build() {
    this.state.textInstance = new TextClass()
    this.buildUI()
  }
})

// page.styles.ts
export const TEXT_STYLE: HmUIWidgetOptions = {
  x: px(96),
  y: px(40),
  w: px(288),
  h: px(46),
  color: 0xffffff,
  text_size: px(36)
}
```

### 2. Screen Adaptation
- Use the built-in `px()` function for consistent scaling across devices
- Organize styles separately for round vs square screens
- Handle status bar presence on square screens
- Example:
```typescript
interface StyleConfig {
  round: HmUIWidgetOptions;
  square: HmUIWidgetOptions;
}

const STYLES: StyleConfig = {
  round: {
    x: px(96),
    y: px(40)
  },
  square: {
    x: px(32), 
    y: px(64) // Account for status bar
  }
}
```

### 3. Widget Management
- Use GROUP widgets to manage related UI elements
- Benefits:
  - Unified visibility control
  - Simplified positioning
  - Better event handling
- Example:
```typescript
interface GroupConfig extends HmUIWidgetOptions {
  children?: HmUIWidget[];
}

const group = hmUI.createWidget(hmUI.widget.GROUP, {
  x: px(0),
  y: px(0),
  w: px(480),
  h: px(80)
}) as HmUIWidget

// Children use relative positioning
const icon = group.createWidget(hmUI.widget.IMG, {
  x: px(20),
  y: px(20)
})
```

### 4. Data Persistence
- Use `LocalStorage` class to wrap `hmFS` operations
- Example:
```typescript
interface StorageOptions {
  fileName: string;
}

class LocalStorage {
  constructor(options: StorageOptions) {
    this.fileName = options.fileName
  }

  set<T>(data: T): void {
    // Implementation using hmFS
  }

  get<T>(): T | null {
    // Implementation using hmFS
  }
}
```

### 5. Cross-Page Communication
- Use URL parameters for one-way data passing
- Use global app state for bi-directional communication
- Example:
```typescript
interface PageParams {
  id: string;
  type: string;
}

// Sending
hmApp.gotoPage({
  url: 'path/to/page',
  param: JSON.stringify({
    id: '0',
    type: 'normal'
  } as PageParams)
})

// Receiving
Page({
  onInit(params: string) {
    const data = JSON.parse(params) as PageParams
  }
})
```

### 6. Runtime Restrictions
- No dynamic code execution (`eval`, `new Function`)
- No Promise support (use polyfill if needed)
- No Generator functions
- No built-in timers (use ZEPP OS timer API)

### 7. Debugging
- Use `HmLogger` for device app logging
- Use `console.log` for settings app and side service
- Example:
```typescript
const logger = DeviceRuntimeCore.HmLogger.getLogger('debug')

logger.log('info message')
logger.error('error message')
logger.warn('warning message')
```

## Common Gotchas

1. ZEPP OS global objects (`hmUI`, `hmApp`, etc.) don't have TypeScript definitions by default
2. Some ZEPP OS methods accept numbers for colors, not string hex values
3. Widget creation methods need proper typing for their options
4. Touch event handling differs between widgets and needs proper typing

## Type Assertion Guidelines

Use type assertions sparingly and only when necessary:

```typescript
// Avoid
const widget = hmUI.createWidget(hmUI.widget.GROUP, config) as any;

// Prefer
const widget = hmUI.createWidget(hmUI.widget.GROUP, config) as HmUIWidget;
```

## Module Exports/Imports

Use ES6 module syntax:

```typescript
// Export
export class ListScreen { }
export type { ListEntry };

// Import
import { ListScreen, ListEntry } from './ListScreen';
```

## References

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [ZEPP OS Documentation](https://docs.zepp.com/docs/reference/device-app-api/hmUI/)
- Project's `tsconfig.json` settings 