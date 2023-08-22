import css from './Button.module.css'

const Button = ({ onclick }) => {
  return (
      <button type="button" onClick={onclick} className={css.Button}>
        Load more
      </button>
  );
};

export default Button;
