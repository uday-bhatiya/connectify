import React, { Suspense } from 'react'
import RightSideBar from './RightSideBar';
import LeftSideBar from './LeftSideBar';
import MobileNavBar from './MobileNavBar';
import { ScrollArea } from "@/components/ui/scroll-area";
import Loading from '../Loading';

export default function BaseComponent({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
        <div className="md:container p-5">
            <div className="flex">
                <LeftSideBar />
                <ScrollArea className="h-screen w-full lg:w-2/4 md:w-3/4 lg:px-8 lg:py-4 xl:px-12  md:p-6">
                    <MobileNavBar />
                    {children}
                </ScrollArea>
                <Suspense fallback={<Loading />}>
                    <RightSideBar />
                </Suspense>
            </div>
        </div>
    );
}
