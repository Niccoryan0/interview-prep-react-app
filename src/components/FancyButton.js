import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/styles';

const FancyButton = styled(Button)({
  background: 'linear-gradient(45deg, #bdc3c7 10%, #2c3e50 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  padding: '3px 5px',
});

export default FancyButton;