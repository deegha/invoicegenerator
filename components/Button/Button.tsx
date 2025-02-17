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
    'text-sm rounded-sm flex items-center justify-center gap-2  transition-all duration-300 cursor-pointer '

  const sizes = {
    small: 'px-3 py-2 text-sm',
    medium: 'px-5 py-2 text-sm',
    large: 'px-7 py-2 text-sm w-[220px]',
  }

  const variants = {
    primary: 'bg-sky-400 hover:bg-sky-500 text-white shadow-md',
    secondary: ' text-sky-400 font-semibold',
    danger: 'bg-rose-600 hover:bg-rose-600 text-white shadow-md',
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
