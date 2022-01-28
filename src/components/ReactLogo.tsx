import reactLogo from '../logo.svg';


export const ReactLogo = () => {
  return (
    <div>
        <img
            src={ reactLogo }
            alt='React Logo'
            style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                width: '100px',
            }}
        />
    </div>
  );
};
