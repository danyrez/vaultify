import { useSpring, animated } from "@react-spring/web";

export default function Card({ name, icon: Icon, count }) {
  const props = useSpring({
    from: { number: 0 },
    to: { number: count },
    config: { duration: 1000 },
  });

  return (
    <div className='bg-white rounded-xl shadow-sm p-6 transition-all duration-200 hover:shadow-md sm:p-4'>
      <div className='flex items-center justify-between mb-4'>
        <div className='p-2 bg-blue-50 rounded-lg'>
          <Icon className='h-6 w-6 text-blue-600' />
        </div>
        <animated.div className='text-2xl font-bold text-gray-900'>
          {props.number.to((n) => n.toFixed(0))}
        </animated.div>
      </div>
      <div className='text-gray-600 font-bold text-xl'>{name}</div>
    </div>
  );
}
