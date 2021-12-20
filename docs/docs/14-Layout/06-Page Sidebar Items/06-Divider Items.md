You can render a divider by using the exported divider item directly.

```typescript
import {dividerSidebarItem} from '@imperium/layout';

createPages(routes, {
  aRoute: {
    sidebar: [
      dividerSidebarItem,	
    ],
  },
});
```
