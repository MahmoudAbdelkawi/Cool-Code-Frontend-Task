import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './interceptor.ts'
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css"; 
import 'primeicons/primeicons.css';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import { QueryClientProvider , QueryClient } from 'react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <div className=' bg-gray-900  flex-col mx-auto  lg:py-0  '>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </div>
)
