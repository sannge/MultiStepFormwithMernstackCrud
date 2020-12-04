import Layout from './containers/Layout'
import {BrowserRouter as Router} from 'react-router-dom'

function App() {
  return (
    <Router>
       <div>
         <Layout/>
       </div>
    </Router>
  );
}

export default App;
