import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './app';

// add custom stylesheet
// tslint:disable-next-line:no-var-requires
require('@src/styles/styles.less');

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
