interface System {
  import<T = any>(module: string): Promise<T>
}
declare var System: System;

declare module '@salesforce/design-system-react';