import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@workspace/ui/components/empty"
import { AlertCircleIcon } from "lucide-react"
import { Link, type ErrorComponentProps } from "@tanstack/react-router"
import { cn } from "@workspace/ui/lib/utils"
import { buttonVariants } from "@workspace/ui/components/button"

export const Error = (props: ErrorComponentProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <AlertCircleIcon />
          </EmptyMedia>
          <EmptyTitle>Error</EmptyTitle>
          <EmptyDescription>{props.error.message}</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Link to="/" className={cn(buttonVariants({ variant: "default" }))}>
            Go to home
          </Link>
        </EmptyContent>
      </Empty>
    </div>
  )
}
