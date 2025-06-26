
const Loader = () => (
  <div style={{
    position: 'fixed',
    top: 0, left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  }}>
    <img
      src="https://new.parkcinema.az/_next/image?url=%2Fanimations%2Floading.gif&w=1920&q=75"
      alt="Yüklənir..."
      style={{ width: '150px', height: '150px' }}
    />
  </div>
);

export default Loader;
