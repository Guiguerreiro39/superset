import { cn } from "@/lib/utils";

type LoadingProps = {
  size?: 'sm' | 'base' | 'lg',
  className?: string
}

const Loading = ({ size = 'base', className }: LoadingProps) => {
  return (<div
    className={cn("inline-block animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]", {
      "h-8 w-8": size === 'base',
      "h-5 w-5 border-2": size === 'sm',
      "h-10 w-10": size === 'lg'
    }, className)}
    role="status">
    <span
      className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
    >Loading...</span>
  </div>);
}

export default Loading;