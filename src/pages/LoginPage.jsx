import FormC from '../components/form/FormC'
import { useChangeTitle } from '../helpers/useChangeTitlePage'

const LoginPage = () => {
  useChangeTitle('login')
  return (
    <>
      <FormC idPage='login' />
    </>
  )
}

export default LoginPage
