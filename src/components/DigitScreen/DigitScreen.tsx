import digit0Image from '@/assets/images/digit_0.png'
import digit1Image from '@/assets/images/digit_1.png'
import digit2Image from '@/assets/images/digit_2.png'
import digit3Image from '@/assets/images/digit_3.png'
import digit4Image from '@/assets/images/digit_4.png'
import digit5Image from '@/assets/images/digit_5.png'
import digit6Image from '@/assets/images/digit_6.png'
import digit7Image from '@/assets/images/digit_7.png'
import digit8Image from '@/assets/images/digit_8.png'
import digit9Image from '@/assets/images/digit_9.png'

const DIGIT_TO_IMAGE: {[index: number]: string} = {
  0: digit0Image,
  1: digit1Image,
  2: digit2Image,
  3: digit3Image,
  4: digit4Image,
  5: digit5Image,
  6: digit6Image,
  7: digit7Image,
  8: digit8Image,
  9: digit9Image
}

interface Props {
  digits: number;
  value: number;
}

function DigitScreen ({digits, value}: Props) {
  const numArr = value
    .toString()
    .slice(-digits)
    .padStart(digits, '0')
    .split('')
    .map(num => parseInt(num));

  return (
    <div className="h-[46px]">
      {numArr.map((num, i) => (
        <div
          key={i}
          className="w-[23px] h-full inline-block dynamic-image"
          style={{
            '--image-url': `url('${DIGIT_TO_IMAGE[num]}')`
          }}
        />
      ))}
    </div>
  )
}

export default DigitScreen;
