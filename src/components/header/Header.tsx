import React, { useEffect } from "react";
import Image from "next/image";
import logo from "../../images/logo.png";
import cartIcon from "../../images/cart.png"
import { CiLocationOn } from "react-icons/ci";
import { BiCaretDown } from "react-icons/bi";
import { HiOutlineSearch } from "react-icons/hi";
import  Link  from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { stateProps } from "../../../type";
import { useSession, signIn} from "next-auth/react";
import { addUser } from "@/store/nextSlice";

const Header = () => {
    const dispatch = useDispatch();
    const { productData, favoriteData, userInfo } = useSelector(
        (state: stateProps) => state.next
    );
    const {data:session} = useSession();
    useEffect(() => {
        if (session) {
            dispatch(addUser({
                name: session?.user?.name,
                email: session?.user?.email,
                image: session?.user?.image,
            }));
        }
    }, [session, dispatch]);
    
    
    return (
    <div className="w-full h-20 bg-amazon_blue text-lightText sticky top-0 z-50"> 
        <div className="h-full w-full mx-auto inline-flex items-center justify-between gap-1 mdl:gap-3 px-4">
        {/* logo */}
        <Link href={"/"} className="px-2 border border-transparent hover:border-white cursor-pointer duration-300 items-center justify-center h-[70%]">
            <Image className="w-28 object-cover" src={logo} alt="logoImg" />
        </Link>
        {/* delivery */}
             <div className="px-2 border border-transparent hover:border-white cursor-pointer duration-300 items-center justify-center h-[70%]">
                <CiLocationOn />
                <div className="text-xs">
                    <p>Deliver to</p>
                    <p className="text-white font-bold uppercase">India</p>
                </div>

             </div>
        {/* SearchBar */}
        <div className="flex-1 h-10 hidden md:inline-flex items-center justify-between relative">
        <input className="w-full h-full rounded-md px-2 placeholder:text-sm text-base text-black border-[3px] border-transparent outline-none
                focus-visible:border-amazon_yellow" type="text" placeholder="Search amazon products"/>
             <span className="w-12 h-full bg-amazon_yellow text-black text-2xl flex items-center justify-center absolute right-0 rounded-md rounded-br-md">
                <HiOutlineSearch />
             </span>
        </div>
        {/* singin */}
        {
                userInfo?<div 
                 className="flex items-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] gap-1">
                    <img src={userInfo.image} alt="userImage"
                    className="w-8 h-8 rounded-full object-cover"/>
                    <div className="text-xs text-gray-100 flec flex-col
                    justify-between">
                        <p className="text-white font-bold">{userInfo.name}</p>
                        <p>{userInfo.email}</p>
                    </div>
                </div>:<div onClick={()=>signIn()} className="text-xs text-gray-100 flex flex-col justify-center px-2 border
            border-transparent hover:border-white cursor-pointer duration-300 h-[70%]">
                <p>Hello, sign in</p>
                <p className="text-white font-bold flex">Account & Lists{" "}<span>
                    <BiCaretDown/></span></p>
            </div>
            }


        {/* favourite */}
        <div className="px-2 border border-transparent hover:border-white cursor-pointer duration-300 items-center justify-center h-[70%] relative" >
                 <p>Marked</p>
                 <p className="text-white font-bold">& Favorites</p>
                 {
                    favoriteData.length > 0 && (
                        <span className="absolute right-2 top-2 w-4 h-4 border-[1px] border-gray-400 flex items-center justify-center text-amazon_yellow">
                               {favoriteData.length}
                        </span>
                    )
                 }
        </div>
        {/* cart */}

        <Link href={"/cart"} className="flex px-2 border border-transparent hover:border-white cursor-pointer duration-300 items-center justify-center h-[70%] relative"> 
            <Image className="w-auto object-cover h-8" src={cartIcon} alt="CartIcon" />
            <p className="text-md text-white font-bold mt-3">cart</p>
            <span className="absolute text-amazon_yellow text-sm top-2 left-[30px] font-bold">
                {productData ? productData.length : 0}
            </span>
        </Link>
        </div>
    </div>
)}

export default Header;