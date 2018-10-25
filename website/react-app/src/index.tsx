import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './app';

// add react styles
// tslint:disable-next-line:no-var-requires
require('./styles/styles.less');
require('@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css');

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
