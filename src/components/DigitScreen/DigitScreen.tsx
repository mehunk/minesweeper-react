import { getImageUrl } from '@/utils/image-url.ts'

interface Props {
  digits: number;
  value: number;
}

function DigitScreen ({digits, value}: Props) {
  const numArr = value
    .toString()
    .slice(-digits)
    .padStart(digits, '0')
    .split('');

  return (
    <div className="h-[46px]">
      {numArr.map((num, i) => (
        <img
          key={i}
          src={getImageUrl(`digit_${num}.png`)}
          className="w-[23px] h-full inline-block"
          alt={`digit-${num}`}
        />
      ))}
    </div>
  )
}

export default DigitScreen;
