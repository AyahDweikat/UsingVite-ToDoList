// eslint-disable-next-line no-unused-vars
import React from "react";
import light from "./logo-light-theme.webp";
import dark from "./logo-dark-theme-removebg-preview-_1_.webp";
import styles from './header.module.css'
import styleTog from './toggler.module.css';

function Header({ handleTheme, toggleTheme, searchValue, setSearchValue }) {
  return (
    <>
      <header>
        <div role="img" aria-label="Logo" className={styles.logo}>
          <img
            id="logoHandle"
            src={toggleTheme ? dark : light}
            role="logo"
            alt="todoistic logo"
          />
        </div>
        <div className={styles.searchHandle}>
          <label htmlFor="seach">
            <i className="fa-solid fa-magnifying-glass" />
            <input
              type="text"
              id="search"
              className={styles.search}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search Tasks"
            />
          </label>
        </div>
        <label className={styleTog.toggle}>
          <input type="checkbox" onChange={() => handleTheme()} />
          <span className={styleTog.slider} />
          <svg
            className={styleTog.sun}
            width={17}
            height={21}
            viewBox="0 0 17 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.50491 5.25C9.80724 5.25 11.0562 5.80312 11.9771 6.78769C12.898 7.77226 13.4154 9.10761 13.4154 10.5C13.4154 11.8924 12.898 13.2277 11.9771 14.2123C11.0562 15.1969 9.80724 15.75 8.50491 15.75C7.20258 15.75 5.95358 15.1969 5.03269 14.2123C4.1118 13.2277 3.59445 11.8924 3.59445 10.5C3.59445 9.10761 4.1118 7.77226 5.03269 6.78769C5.95358 5.80312 7.20258 5.25 8.50491 5.25ZM8.50491 7.35C7.72351 7.35 6.97411 7.68187 6.42158 8.27261C5.86905 8.86335 5.55864 9.66457 5.55864 10.5C5.55864 11.3354 5.86905 12.1366 6.42158 12.7274C6.97411 13.3181 7.72351 13.65 8.50491 13.65C9.28631 13.65 10.0357 13.3181 10.5882 12.7274C11.1408 12.1366 11.4512 11.3354 11.4512 10.5C11.4512 9.66457 11.1408 8.86335 10.5882 8.27261C10.0357 7.68187 9.28631 7.35 8.50491 7.35ZM8.50491 0L10.8521 3.591C10.1254 3.3075 9.32987 3.15 8.50491 3.15C7.67995 3.15 6.88446 3.3075 6.15771 3.591L8.50491 0ZM0 5.25L4.0855 4.8825C3.49624 5.418 2.96592 6.069 2.55344 6.825C2.12132 7.602 1.87579 8.4 1.7383 9.2295L0 5.25ZM0.0196418 15.75L1.74812 11.7915C1.88562 12.6 2.15078 13.419 2.56326 14.175C2.97574 14.952 3.50607 15.603 4.0855 16.1385L0.0196418 15.75ZM17 5.25L15.2617 9.2295C15.1242 8.4 14.859 7.5915 14.4466 6.825C14.0341 6.069 13.5136 5.4075 12.9243 4.872L17 5.25ZM16.9902 15.75L12.9243 16.128C13.5038 15.5925 14.0243 14.931 14.4367 14.175C14.8492 13.4085 15.1144 12.6 15.2519 11.7705L16.9902 15.75ZM8.50491 21L6.13807 17.388C6.86482 17.6715 7.66031 17.85 8.50491 17.85C9.31023 17.85 10.1057 17.6715 10.8325 17.388L8.50491 21Z"
              fill="white"
            />
          </svg>
          <svg
            className={styleTog.moon}
            width={14}
            height={21}
            viewBox="0 0 14 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.99082e-08 10.5C-0.000102788 12.1486 0.397977 13.774 1.16201 15.2447C1.92604 16.7154 3.03456 17.99 4.3978 18.9653C5.76105 19.9406 7.34072 20.5893 9.00891 20.8588C10.6771 21.1283 12.3869 21.011 14 20.5164C11.8134 19.8464 9.90307 18.5138 8.5469 16.7124C7.19073 14.9109 6.45946 12.7346 6.45946 10.5C6.45946 8.26541 7.19073 6.08909 8.5469 4.28764C9.90307 2.48618 11.8134 1.15356 14 0.48361C12.3869 -0.0109591 10.6771 -0.128257 9.00891 0.141214C7.34072 0.410685 5.76105 1.05935 4.3978 2.0347C3.03456 3.01004 1.92604 4.28465 1.16201 5.75533C0.397977 7.22601 -0.000102788 8.85144 1.99082e-08 10.5Z"
              fill="black"
            />
          </svg>
          <span className={styleTog.labels} data-on data-off />
        </label>
      </header>
      
    </>
  );
}

export default Header;
