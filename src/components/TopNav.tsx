import React, { useEffect, useRef, useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Link, useLocation } from "react-router-dom";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import CurrencyToggle from "./CurrencyToggle";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import styled from "styled-components";
import { RouteName } from "../constant/routeNames";

interface TopNavProps {
  showCurrencyToggle?: boolean;
}

const ROUTES = [
  { url: RouteName.home, name: "Marketplace" },
  { url: RouteName.auctionsView, name: "Auctions" },
  { url: RouteName.activityView, name: "Activity" },
];

const EXTERNALROUTES = [
  { url: RouteName.magicEden, name: "Buy a Golden Pass" },
  { url: RouteName.raydium, name: "Trade $GCC" },
];

const OTHER_LAYOUT_ROUTES = [
  { url: RouteName.customToken, name: "Custom Token Marketplace" },
  { url: RouteName.multipleCollection, name: "Multi Collection Marketplace" },
  { url: RouteName.marketplaceWithUrl, name: "Marketplace With URL" },
  {
    url: RouteName.multipleCurrencyMarketplace,
    name: "Multi Currency Marketplace",
  },
  { url: RouteName.multipleCurrencySell, name: "Multi Currency Sell" },

];

const TopNav: React.FC<TopNavProps> = ({ showCurrencyToggle = false }) => {
  const wallet = useAnchorWallet();

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLLIElement>(null);

  const { pathname } = useLocation();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: any) => {
    if (anchorRef.current?.contains(event.target)) return;
    setOpen(false);
  };

  const handleListKeyDown = (event: any) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current?.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <HeaderBar>
      <Logo>
        <a href="https://www.gatsbyclub.net/" target="_blank">
          <img alt="" src="/logo.png" />
        </a>
      </Logo>
      <Menu>
        {ROUTES.map((item) => (
          <li key={item.url} className={pathname === item.url ? "active" : ""}>
            <Link to={item.url}>{item.name}</Link>
          </li>
        ))}
        {EXTERNALROUTES.map((item) => (
            <li key={item.url} className={pathname === item.url ? "active" : ""}>
              <a href={item.url} target="_blank">{item.name}</a>
            </li>
        ))}
      </Menu>
      {showCurrencyToggle && <CurrencyToggle />}
      <Wallet>
        {wallet ? (
          <ConnectButton />
        ) : (
          <ConnectButton>Connect Wallet</ConnectButton>
        )}
      </Wallet>
    </HeaderBar>
  );
};

const HeaderBar = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`;

const DropdownAnchor = styled.li`
  cursor: pointer;
  transition: color 0.3s;

  &:hover,
  &:active {
    color: rgb(131, 146, 161);
    border-bottom: 2px solid var(--title-text-color);
  }

  > div {
    z-index: 1000;
  }

  .MuiList-root {
    margin-top: 15px;
  }
  a {
    padding-top: 4px;
    padding-bottom: 4px;

    &:hover {
      border-bottom: 0px;
      color: #fff;
    }
  }
`;

const Wallet = styled.ul`
  flex: 0 0 auto;
  margin: 0;
  padding: 0;
`;

const ConnectButton = styled(WalletMultiButton)`
  padding: 6px 16px;
  border-radius: 12px !important;
  background-color: #4e44ce;
  margin: 0 auto;
`;

const Logo = styled.div`
  flex: 0 0 auto;
  margin-right: 10px;

  img {
    height: 60px;
  }
`;

const Menu = styled.ul`
  list-style: none;
  display: inline-flex;
  flex: 1 0 auto;
  margin-bottom: 0;

  > .active {
    border-bottom: 2px solid var(--title-text-color);
  }

  > .active-submenu {
    background-color: rgba(255, 255, 255, 0.08);
  }

  > li {
    margin: 0 12px;
    padding: 8px;

    a {
      color: var(--main-text-color);
      list-style-image: none;
      list-style-position: outside;
      list-style-type: none;
      outline: none;
      text-decoration: none;
      text-size-adjust: 100%;
      touch-action: manipulation;
      transition: color 0.3s;

      img {
        max-height: 26px;
      }
    }

    &:hover,
    &:active {
      border-bottom: 2px solid var(--title-text-color);
    }

    &:hover > a {
      color: rgb(131, 146, 161);
    }
  }
`;

export default TopNav;
