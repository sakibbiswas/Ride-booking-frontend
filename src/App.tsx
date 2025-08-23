import { Toaster } from 'react-hot-toast'
import RoutesConfig from './router/routes'

function App() {
  return (
    <>
      <RoutesConfig />
      <Toaster position="top-center" />
    </>
  )
}
export default App
