import {connect} from 'react-redux';

import Component from './component';
import actions from './actions';
const {
  fetchQuestions,
} = actions;

const mapStateToProps = (state, ownProps) => {
  return {
    questions: state.home.questions.questions,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    componentDidMount: () => {
      dispatch(fetchQuestions());
    },
  };
};

/**
 * Connected react component
 */
@connect(mapStateToProps, mapDispatchToProps)
class HomeContainer extends Component {

}

export default HomeContainer;
