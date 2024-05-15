"use client"
import Image from "next/image";
import { Button } from "./ui/button";
import { HeartIcon, HomeIcon, LogOutIcon, MenuIcon, ScrollTextIcon, UserIcon } from 'lucide-react';
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";



const Header = () => {


  const { data } = useSession()
  const user = data?.user


  const handleSignInClick = () => {
    signIn()
  }
  const handleSingOutClick = () => {
    signOut()
  }
  return (
    <div className="flex justify-between pt-6 px-5">
      <div className="relative h-9 w-20">
        <Link href={"/"}>
          <Image
            src={"/logo.png"}
            alt="ifood"
            fill
            className="object-contain"
          />
        </Link>

      </div>

      <Sheet>
        <SheetTrigger>
          <Button
            size="icon"
            variant="outline"
            className="border-none bg-transparent">
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-left">
              Menu
            </SheetTitle>
          </SheetHeader>
          {data?.user ? (
            <>

              <div className=" flex justify-between pt-6">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={user?.image as string | undefined} />
                    <AvatarFallback>
                      {user?.name?.split("")[0][0]}
                      {user?.name?.split("")[1][0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>

                    <h3 className="font-semibold text-sm leading-4">
                      {user?.name}
                    </h3>
                    <span className="text-xs text-muted-foreground block">{user?.email}
                    </span>
                  </div>

                </div>
              </div>
            </>
          )
            : (
              <>
                <div className="flex justify-between items-center pt-10">
                  <h2 className="font-semibold">Faça seu login</h2>
                  <Button size={"icon"} onClick={handleSignInClick} className="size-9">
                    <UserIcon />
                  </Button>
                </div>
              </>
            )}
          <div className="py-6">
            <Separator />
          </div>
          <div className="space-y-2">
            <Button
              variant={"ghost"}
              className="w-full justify-start space-x-3 text-sm font-normal"
              asChild
            >
              <Link href={"/"}>
                <HomeIcon />
                <span>Início</span>
              </Link>

            </Button>
          </div>

          {user && (
            <>
              <div>
                <Button
                  variant={"ghost"}
                  className="w-full justify-start space-x-3 text-sm font-normal"
                  asChild
                >
                  <Link href="/my-orders" >
                    <ScrollTextIcon />
                    <span>Meus Pedidos</span>
                  </Link>
                </Button>
              </div>

              <div>
                <Button variant={"ghost"} className="w-full justify-start space-x-3 text-sm font-normal" asChild>
                  <Link href={"/my-favorites-restaurants"}>
                    <HeartIcon />
                    <span>Restaurantes Favoritos</span>
                  </Link>

                </Button>
              </div>
            </>
          )}

          <div className="py-6">
            <Separator />
          </div>
          {user &&
            <Button
              variant={"ghost"}
              className="w-full justify-start space-x-3 text-sm font-normal"
              onClick={handleSingOutClick}
            >
              <LogOutIcon size={20} />
              <span> Sair da conta</span>
            </Button>
          }
        </SheetContent>
      </Sheet>
    </div >
  );
}

export default Header;