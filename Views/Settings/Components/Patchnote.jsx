import React from "react";
import CreateLink from "../../../Components/Text/Link";
import style from "../../../Style/All.module.scss"

function Patchnote() {
    return (
        <div id="connexions">
            <h3>Patch</h3>
            <div>
                <div>
                    <ul className={`${style.column} ${style.text_left}`}>
                        <li>Limite à 900 requêtes toutes les 15 minutes</li>
                        <li>Ajout d'un système de flags en bits : <CreateLink href="https://www.w3schools.com/js/js_bitwise.asp">voir plus</CreateLink></li>
                        <li>Amélioration du design
                            <ul>
                                <li>Barre de navigation</li>
                                <li>Recherche rapide</li>
                                <li>Post partie haute</li>
                                <li>Post partie basse</li>
                                <li>Post audio</li>
                                <li>Icônes</li>
                                <li>Liens</li>
                                <li>Affichage liste utilisateurs</li>
                                <li>Affichage des pages</li>
                                <li>Ajout d'une barre de scroll</li>
                            </ul>
                        </li>
                        <li>Amélioration du référencement web</li>
                        <li>Amélioration des performances</li>
                        <li>Amélioration des liens pour la page des paramètres
                            <ul>
                                <li>Modification de /settings/all en /settings</li>
                                <li>Ajout d'un onglet patchnote</li>
                            </ul>
                        </li>
                        <li>Amélioration d'affichage des images</li>
                        <li>Suppression des postes (version de test)</li>
                        <li>Ajout des commentaires</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Patchnote;