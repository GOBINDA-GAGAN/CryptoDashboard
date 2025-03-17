import React, { useEffect, useState, useCallback } from "react";
import Button from "../components/Common/Button";
import Header from "../components/Common/Header";
import TabsComponent from "../components/Dashboard/Tabs";
import { get100Coins } from "../functions/get100Coins";

function Watchlist() {
  const watchlist = JSON.parse(localStorage.getItem("watchlist"));
  const [coins, setCoins] = useState([]);

  // Wrap getData in useCallback so it remains stable across renders
  const getData = useCallback(async () => {
    const allCoins = await get100Coins();
    if (allCoins && watchlist) {
      setCoins(allCoins.filter((coin) => watchlist.includes(coin.id)));
    }
  }, [watchlist]);

  useEffect(() => {
    if (watchlist?.length > 0) {
      getData();
    }
  }, [watchlist, getData]); // ✅ No ESLint warning now

  return (
    <div>
      <Header />
      {watchlist?.length > 0 ? (
        <TabsComponent coins={coins} />
      ) : (
        <div>
          <h1 style={{ textAlign: "center" }}>
            Sorry, No Items In The Watchlist.
          </h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "2rem",
            }}
          >
            <a href="/dashboard">
              <Button text="Dashboard" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Watchlist;
