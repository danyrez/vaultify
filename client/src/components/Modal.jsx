import { useSpring, animated } from "@react-spring/web";

export default function Modal({ isOpen, onClose, children }) {
  const animation = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? "scale(1)" : "scale(0.9)",
    config: { tension: 300, friction: 20 },
  });

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4'>
      <animated.div
        style={animation}
        className='bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative'
      >
        <button
          className='absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-3xl'
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </animated.div>
    </div>
  );
}
