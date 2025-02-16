import clsx from 'clsx'

export function cn(...classes: (string | boolean | undefined)[]) {
  return clsx(classes)
}
