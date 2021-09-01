import React from 'react'
import Style from "./footer.module.scss";
import imgFooter from "../../assets/images/footer.svg"

export default function Footer() {
    return (
        <footer className={Style.footer}>
            <img src={imgFooter} alt="makes_music_do_fine" />
        </footer>
    )
}
