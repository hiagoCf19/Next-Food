"use client"
import Image from "next/image";
import { Button } from "./ui/button";
import { HeartIcon, HomeIcon, LogInIcon, LogOutIcon, MenuIcon, ScrollTextIcon, UserIcon } from 'lucide-react';
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Category } from "@prisma/client";
import InputForm from "./InputForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "./ui/alert-dialog";


interface HeaderProps {
  categories: Category[]
  hiddenInputHeader?: boolean
}
const Header = ({ categories, hiddenInputHeader }: HeaderProps) => {
  const { data } = useSession()
  const user = data?.user
  const handleSignInClick = () => {
    signIn()
  }
  const handleSingOutClick = () => {
    signOut()
  }
  return (
    <div className="flex justify-between items-center sm:pt-0  px-5 sm:px-40">

      <Link href={"/"}>
        <Image
          src={"/logo.svg"}
          alt="ifood"
          width={150}
          height={150}
          className="object-contain"
        />
      </Link>

      {!hiddenInputHeader && (
        <div className="hidden sm:block w-min">
          <InputForm className="border-none sm:bg-muted mr-2 outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm" />
        </div>
      )
      }

      <Sheet>
        <SheetTrigger asChild>
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
                    <LogInIcon />
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
                <span className="font-medium">Início</span>
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
          {/*  categories */}
          <div className="space-y-2">
            {categories.map((category) => (
              <Button
                variant={"ghost"}
                className="w-full justify-start space-x-3 text-sm font-normal"
                asChild
                key={category.id}
              >
                <Link href={`categories/${category.id}/products`}>
                  <Image
                    src={category.imageUrl}
                    width={25}
                    height={25}
                    alt={category.name}
                  />
                  <span className="font-medium">{category.name}</span>
                </Link>

              </Button>
            ))}

          </div>
          <div className="py-6">
            <Separator />
          </div>
          {user &&
            <Button
              variant={"ghost"}
              className="w-full justify-start space-x-3 text-sm font-normal"

            >
              <LogOutIcon size={20} className="text-red-500" />
              <AlertDialog>
                <AlertDialogTrigger>
                  <span className="text-red-500 font-medium"> Sair da conta</span>
                </AlertDialogTrigger>
                <AlertDialogContent className="max-w-sm rounded-sm">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-center">Deseja sair?
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter className=" gap-2 sm:gap-0 sm:justify-center items-center flex-row">
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleSingOutClick}
                      className="mt-2 sm:mt-0"
                    >Sair</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

            </Button>
          }
        </SheetContent>
      </Sheet>
    </div >
  );
}

export default Header;