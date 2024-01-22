export const pageBackgroundImage = () => {
  const overlay = document.createElement('div');
  overlay.style.backgroundImage = "url('/assets/images/background-image.jpg')";
  overlay.style.backgroundSize = 'cover';
  overlay.style.backgroundPosition = 'center';
  overlay.style.backgroundRepeat = 'no-repeat';
  overlay.style.height = '100vh';
  overlay.style.width = '100vw';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.zIndex = '-1';
  overlay.style.opacity = '0.3';

  return overlay;
};
