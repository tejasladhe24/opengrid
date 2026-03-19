import { getSession } from "@/server/auth"
import { createFileRoute } from "@tanstack/react-router"
import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Separator } from "@workspace/ui/components/separator"
import {
  ArrowRightIcon,
  BadgeCheckIcon,
  BellIcon,
  CarTaxiFrontIcon,
  FilterIcon,
  SearchIcon,
  ShoppingBagIcon,
  SparklesIcon,
  StarIcon,
  StoreIcon,
  TicketIcon,
  UtensilsIcon,
} from "lucide-react"
import { NavUser } from "@/components/nav-user"
import { LocationSwitcher, type Location } from "@/components/location-switcher"

export const Route = createFileRoute("/(app)/_/")({
  component: RouteComponent,
  loader: async () => {
    const session = await getSession()

    return { session }
  },
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "OpenGrid | Nearby",
      },
    ],
  }),
})

const addressBook: Location[] = [
  {
    name: "Near you",
    address: "Pune, Kothrud",
    distance: "0.1 km",
  },
  {
    name: "Home",
    address: "Aundh, Pune",
    distance: "10 km",
  },
  {
    name: "Work",
    address: "Hinjewadi, Pune",
    distance: "15 km",
  },
]

const categories = [
  { label: "Food", icon: UtensilsIcon },
  { label: "Groceries", icon: ShoppingBagIcon },
  { label: "Cabs", icon: CarTaxiFrontIcon },
  { label: "Shops", icon: StoreIcon },
  { label: "Movies", icon: TicketIcon },
] as const

const nearYou = [
  {
    name: "Sahyadri Cloud Kitchen",
    category: "Food",
    distance: "1.2 km",
    eta: "25–35 min",
    rating: "4.6",
    points: "+92",
    priceHint: "Same as offline",
    tags: ["Direct-friendly", "No hidden charges"],
  },
  {
    name: "Asha Medical & Essentials",
    category: "Groceries",
    distance: "800 m",
    eta: "15–25 min",
    rating: "4.4",
    points: "+88",
    priceHint: "MRP-first",
    tags: ["Fast pickup", "Transparent billing"],
  },
  {
    name: "CityRide Auto Stand",
    category: "Cabs",
    distance: "1.9 km",
    eta: "5–10 min",
    rating: "4.3",
    points: "+81",
    priceHint: "No surge promise",
    tags: ["On-time focus", "Low cancellations"],
  },
  {
    name: "Shree Ganesh Hardware",
    category: "Shops",
    distance: "2.4 km",
    eta: "Pickup",
    rating: "4.5",
    points: "+90",
    priceHint: "Billable quotes",
    tags: ["Verified invoices", "Fair returns"],
  },
] as const

const spotlight = [
  {
    title: "Bring Your Own Customers",
    description:
      "Scan a shop QR or open a referral link to become a DIRECT customer.",
    badge: "0% platform fee",
    icon: SparklesIcon,
  },
  {
    title: "Trust points that matter",
    description:
      "Honest cancellations, fair pricing, and good service increase points over time.",
    badge: "Transparent rules",
    icon: BadgeCheckIcon,
  },
] as const

function RouteComponent() {
  Route.useLoaderData()

  return (
    <div className="h-full overflow-y-auto bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-4 md:px-6 md:py-6">
        <header className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <LocationSwitcher locations={addressBook} />
            <Badge variant="secondary" className="hidden sm:inline-flex">
              DIRECT = 0% fee
            </Badge>
            <Badge variant="secondary" className="hidden sm:inline-flex">
              PLATFORM = 5–10%
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <BellIcon />
            </Button>
            <NavUser />
          </div>
        </header>

        <div className="mt-4 grid gap-3 md:mt-6">
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="h-11 pl-9"
              placeholder="Search anything: food, salons, cabs, repairs, rentals…"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm">
              <FilterIcon />
              Filters
            </Button>
            <Button variant="outline" size="sm">
              Under 30 min
            </Button>
            <Button variant="outline" size="sm">
              Best points
            </Button>
            <Button variant="outline" size="sm">
              Same as offline
            </Button>
            <Button variant="outline" size="sm">
              DIRECT-friendly
            </Button>
          </div>
        </div>

        <section className="mt-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-base font-semibold">Explore categories</div>
              <div className="text-sm text-muted-foreground">
                Open marketplace — not niche-specific.
              </div>
            </div>
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              See all <ArrowRightIcon />
            </Button>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {categories.map((c) => (
              <Card key={c.label} size="sm" className="hover:bg-muted/30">
                <CardContent className="flex items-center gap-3">
                  <div className="grid size-9 place-items-center rounded-lg border bg-background">
                    <c.icon className="size-4 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate font-medium">{c.label}</div>
                    <div className="truncate text-xs text-muted-foreground">
                      Nearby picks
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <div className="flex items-end justify-between gap-3">
            <div>
              <div className="text-base font-semibold">Spotlight</div>
              <div className="text-sm text-muted-foreground">
                How OpenGrid stays fair for both sides.
              </div>
            </div>
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Learn <ArrowRightIcon />
            </Button>
          </div>

          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {spotlight.map((s) => (
              <Card key={s.title}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <div className="grid size-8 place-items-center rounded-lg border bg-background">
                      <s.icon className="size-4 text-muted-foreground" />
                    </div>
                    <span className="min-w-0 truncate">{s.title}</span>
                  </CardTitle>
                  <CardDescription>{s.description}</CardDescription>
                </CardHeader>
                <CardFooter className="justify-between">
                  <Badge variant="secondary">{s.badge}</Badge>
                  <Button variant="ghost" size="sm">
                    Details <ArrowRightIcon />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-6" />

        <section>
          <div className="flex items-end justify-between gap-3">
            <div>
              <div className="text-base font-semibold">Near you</div>
              <div className="text-sm text-muted-foreground">
                Preview cards (static UI, no live data yet).
              </div>
            </div>
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              View map <ArrowRightIcon />
            </Button>
          </div>

          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {nearYou.map((b) => (
              <Card key={b.name} className="hover:bg-muted/30">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate">{b.name}</div>
                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        <Badge variant="secondary">{b.category}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {b.distance} • {b.eta}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 rounded-lg border bg-background px-2 py-1 text-xs">
                      <StarIcon className="size-3.5 text-muted-foreground" />
                      <span className="font-medium">{b.rating}</span>
                    </div>
                  </CardTitle>
                  <CardDescription className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1">
                      <BadgeCheckIcon className="size-4 text-muted-foreground" />
                      Trust points{" "}
                      <span className="font-medium">{b.points}</span>
                    </span>
                    <span className="text-muted-foreground">•</span>
                    <span>{b.priceHint}</span>
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-wrap gap-2">
                  {b.tags.map((t) => (
                    <Badge key={t} variant="outline">
                      {t}
                    </Badge>
                  ))}
                </CardContent>

                <CardFooter className="justify-between">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                  <Button size="sm">
                    Order <ArrowRightIcon />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-card p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <BadgeCheckIcon className="size-4 text-muted-foreground" />
                Transparent fee preview
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                DIRECT customers pay businesses with 0% platform fee; PLATFORM
                discovery is 5–10%. This UI will later show it per order.
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                How it works
              </Button>
              <Button size="sm">
                Start browsing <ArrowRightIcon />
              </Button>
            </div>
          </div>
        </section>

        <footer className="mt-8 pb-6 text-center text-xs text-muted-foreground">
          Built for fairness: businesses own customers, platform earns only when
          it creates value.
        </footer>
      </div>
    </div>
  )
}
