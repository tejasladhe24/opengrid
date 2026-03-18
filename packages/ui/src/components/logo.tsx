import { Button } from "./button"

export const Logo = () => {
  return (
    <Button variant={"ghost"}>
      <h1 className="text-xl">
        Open
        <span className="rounded-sm bg-indigo-500 px-0.5 text-primary">
          Grid
        </span>
      </h1>
    </Button>
  )
}

export const LogoBusiness = () => {
  return (
    <Button variant={"ghost"}>
      <h1 className="text-xl">
        Open
        <span className="rounded-sm bg-indigo-500 px-0.5 text-primary">
          Grid
        </span>{" "}
        Business
      </h1>
    </Button>
  )
}
