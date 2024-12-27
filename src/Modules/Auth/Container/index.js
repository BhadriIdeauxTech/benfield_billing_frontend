import { connect } from 'react-redux'
import { SignIn } from '../actions'

import UserSignin from '../Components/UserSignin'
import selector from '../selectors'

const mapStateToProps = state => ({
  token: selector.getToken(state),
})

const mapDispatchToProps = {
  SignIn,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSignin)
