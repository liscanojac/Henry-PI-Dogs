import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css"

export default function LandingPage() {
  return (
    <div className={`${styles.body} grilla`}>
      <div>
        <h1>Welcome to PI-Dogs</h1>
        <Link to='/home'>
          <button>Enter</button>
        </Link>
      </div>
      <div className={styles.dogBg}>
        {/* <img src="/images/pexels-pixabay-65928.jpg" alt="" /> */}
      </div>
    </div>
  );
}