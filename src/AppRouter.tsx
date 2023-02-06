import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
// // Pages
const LandingPage = React.lazy(() => import('./pages/Landing.page'));
const AuctionPage = React.lazy(() => import('./pages/Auction.page'));
const ExpeditionPage = React.lazy(() => import('./pages/Expedition.page'));
const RecordPage = React.lazy(() => import('./pages/Record.page'));
const RaidPage = React.lazy(() => import('./pages/Raid.page'));
const NotFoundPage = React.lazy(() => import('./pages/Notfound.page'));

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/expedition" element={<ExpeditionPage/>}/>
            <Route path="/record" element={<RecordPage/>}/>
            <Route path="/raid" element={<RaidPage/>}/>
            <Route path="/auction" element={<AuctionPage/>}/>
            <Route path="/404" element={<NotFoundPage/>}/>
            {/*위에 라우터들 못찾으면 error page ( 마지막에 있어야 함 ) */}
            <Route element={<NotFoundPage/>} />
        </Routes>
    );
}
