/* eslint-disable @next/next/no-img-element */
"use client"
import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { AuthSlider } from "./AuthSlider"
import { CartSlider } from "./CartSlider"
import { SideNav } from "./SideNav"
import { BuilderContent } from '@builder.io/react';
import { useLanguage } from "@/lib/hooks/useLanguage"

type Language = 'en' | 'es';

const languageLinks: Record<Language, string> = {
  en: "/en/home",
  es: "/es/home",
};

export function Header({ headerContent }: any) {
  const router = useRouter();
  const { language, changeLanguage } = useLanguage();

  return (
    <BuilderContent model="header-links" content={headerContent}>
      {(data) => (
        <header className="w-full flex flex-1 border-y mb-4">
          <div className="px-4 p-3 flex justify-between container gap-4">
            <NavigationMenuItem className="flex md:hidden">
              <SideNav />
            </NavigationMenuItem>
            <Button variant="link" asChild>
              <Link href="/" passHref>
                <img
                  className="h-6"
                  src="https://cdn.builder.io/api/v1/image/assets%2Fa87584e551b6472fa0f0a2eb10f2c0ff%2F692369ff646645349e68a86b43fc7a38"
                  alt="Builder.io Logo"
                  loading="lazy"
                />
              </Link>
            </Button>
            <NavigationMenu className="hidden md:flex space-x-5">
              <NavigationMenuList className="justify-around w-full">
                {data?.headerLinks.map((item: any, index: number) => {
                  return (
                    <Button key={index} variant="link" className="text-md">
                      <Link href={item.path || '/'} legacyBehavior passHref >
                        <span className={`uppercase ${item.highlight ? "text-rose-500" : ""}`}>{item.label}</span>
                      </Link>
                    </Button>
                  )
                })}
              </NavigationMenuList>
            </NavigationMenu>
            <div className="flex items-center">
              <select
                value={language}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  const value = e.target.value as Language;
                  console.log(`Selected language: ${value}, Navigating to: ${languageLinks[value]}`);
                  changeLanguage(value);
                  router.push(languageLinks[value]);
                }}
                aria-label="Select language"
                className="border border-neutral-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300 bg-white text-gray-800"
              >
                <option value="en">EN</option>
                <option value="es">ES</option>
              </select>
              <CartSlider variant="black" />
              <AuthSlider variant="black" />
            </div>
          </div>
        </header>
      )}
    </BuilderContent>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-light leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
