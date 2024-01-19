import Box from '@mui/material/Box';
import WebsiteTheme from './WebsiteTheme';
import PropTypes from 'prop-types';

export default function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        display: 'inline-flex',
        p: 1,
        m: 0.3,
        ml:1,
        bgcolor: WebsiteTheme().palette[props.id].main,
        color: WebsiteTheme().palette[props.id].contrastText,
        borderRadius: 3,
        fontSize: '0.875rem',
        fontWeight: '700',
          zIndex: '2',
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};