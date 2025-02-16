import { cn } from 'utils/cn'
import { ButtonHTMLAttributes } from 'react'
import { Loader } from 'react-feather'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
  loading?: boolean
  size?: 'small' | 'medium' | 'large'
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  loading,
  disabled,
  children,
  className,
  ...props
}) => {
  const baseStyles =
    'font-semibold rounded-lg flex items-center justify-center gap-2 text-white transition-all duration-300 cursor-pointer shadow-md'

  const sizes = {
    small: 'px-3 py-2 text-sm',
    medium: 'px-5 py-2 text-sm',
    large: 'px-7 py-2 text-sm w-[220px]',
  }

  const variants = {
    primary: 'bg-[#3674B5] hover:bg-[#578FCA]',
    secondary: 'bg-[#A1E3F9] hover:bg-[#D1F8EF] text-black',
    danger: 'bg-[#d32f2f] hover:bg-[#b52a2a]',
  }

  return (
    <button
      className={cn(
        baseStyles,
        sizes[size],
        variants[variant],
        disabled && 'opacity-90 cursor-not-allowed',
        'hover:scale-105 active:scale-95',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="animate-spin">
          <Loader className="h-5 w-5" />
        </div>
      ) : (
        children
      )}
    </button>
  )
}
