import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@workspace/ui/components/empty"
import { FileXCornerIcon } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { cn } from "@workspace/ui/lib/utils"
import { buttonVariants } from "@workspace/ui/components/button"

export const NotFound = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FileXCornerIcon />
          </EmptyMedia>
          <EmptyTitle>404 - Not Found</EmptyTitle>
          <EmptyDescription>
            The page you&apos;re looking for doesn&apos;t exist. Try searching
            for what you need below.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Link to="/" className={cn(buttonVariants({ variant: "default" }))}>
            Go to Home
          </Link>
        </EmptyContent>
      </Empty>
    </div>
  )
}
