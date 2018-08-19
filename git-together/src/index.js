import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
<Router>
  <App />
</Router>,
document.getElementById('root')
)


// old code commented out, was recieving error "You should not use <Link> outside a <Router>"
// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
